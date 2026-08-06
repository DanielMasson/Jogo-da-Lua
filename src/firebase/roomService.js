import {
  ref,
  set,
  update,
  onValue,
  runTransaction,
  serverTimestamp,
  remove,
  get,
} from "firebase/database";
import { db } from "./config";

/** Gera um código de sala numérico de 4 dígitos, ex.: "4821". */
function gerarCodigo() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

/** Gera um id curto para jogador (guardado no localStorage do celular). */
function gerarId(prefixo) {
  return `${prefixo}_${Math.random().toString(36).slice(2, 10)}`;
}

/* ------------------------------------------------------------------ */
/* Criação e ciclo de vida da sala (chamado pelo anfitrião)            */
/* ------------------------------------------------------------------ */

/**
 * Cria uma sala nova. Tenta até achar um código livre (raríssimo colidir,
 * mas mais seguro que assumir sempre livre).
 * Retorna { codigo, hostId }.
 */
export async function criarSala({ numGrupos = 4, modoFormacao = "aleatorio", duracaoRodadaSeg = 30 } = {}) {
  const hostId = gerarId("host");

  for (let tentativa = 0; tentativa < 5; tentativa++) {
    const codigo = gerarCodigo();
    const salaRef = ref(db, `rooms/${codigo}`);
    const snap = await get(salaRef);
    if (snap.exists()) continue;

    await set(salaRef, {
      status: "lobby",
      criadaEm: serverTimestamp(),
      hostId,
      config: { numGrupos, modoFormacao, duracaoRodadaSeg },
      jogadores: {},
      grupos: {},
      rodadaAtual: null,
    });

    return { codigo, hostId };
  }
  throw new Error("Não foi possível gerar um código de sala livre. Tente novamente.");
}

/** Encerra e apaga a sala (host saiu / jogo terminou de vez). */
export function encerrarSala(codigo) {
  return remove(ref(db, `rooms/${codigo}`));
}

/* ------------------------------------------------------------------ */
/* Entrada de jogadores (chamado pelo celular)                         */
/* ------------------------------------------------------------------ */

/**
 * Jogador entra numa sala existente. Lança erro se o código não existir
 * ou se a sala já não estiver mais aceitando gente (status !== "lobby").
 * Retorna { jogadorId }.
 */
export async function entrarNaSala(codigo, nome) {
  const salaRef = ref(db, `rooms/${codigo}`);
  const snap = await get(salaRef);
  if (!snap.exists()) throw new Error("Sala não encontrada. Confira o código.");

  const sala = snap.val();
  if (sala.status !== "lobby") {
    throw new Error("Esta sala já começou o jogo e não está mais aceitando novos jogadores.");
  }

  const jogadorId = gerarId("j");
  await set(ref(db, `rooms/${codigo}/jogadores/${jogadorId}`), {
    nome: nome.trim().slice(0, 24),
    grupoId: null,
    entrouEm: serverTimestamp(),
    online: true,
  });

  return { jogadorId };
}

/** Marca o jogador como offline sem removê-lo (mantém grupo/pontos). */
export function marcarOffline(codigo, jogadorId) {
  return update(ref(db, `rooms/${codigo}/jogadores/${jogadorId}`), { online: false });
}

/* ------------------------------------------------------------------ */
/* Escuta em tempo real — usada tanto pelo host quanto pelo jogador    */
/* ------------------------------------------------------------------ */

/** onSnapshot-style: chama cb(salaOuNull) toda vez que a sala mudar. */
export function ouvirSala(codigo, cb) {
  const salaRef = ref(db, `rooms/${codigo}`);
  const unsubscribe = onValue(salaRef, (snap) => cb(snap.exists() ? snap.val() : null));
  return unsubscribe;
}

/* ------------------------------------------------------------------ */
/* Ações do anfitrião                                                   */
/* ------------------------------------------------------------------ */

export function formarGrupos(codigo, gruposObj) {
  // gruposObj: { g1: { nome, pontos: 0 }, g2: {...}, ... }
  return update(ref(db, `rooms/${codigo}`), { grupos: gruposObj, status: "grupos" });
}

export function atribuirJogadorAoGrupo(codigo, jogadorId, grupoId) {
  return update(ref(db, `rooms/${codigo}/jogadores/${jogadorId}`), { grupoId });
}

export function iniciarJogo(codigo) {
  return update(ref(db, `rooms/${codigo}`), { status: "jogando" });
}

/** Publica a pergunta sorteada (setor girado) e abre a votação. */
export function iniciarRodada(codigo, { setor, indice, texto, verdadeiro, correcao, duracaoRodadaSeg }) {
  const timerFimEm = duracaoRodadaSeg ? Date.now() + duracaoRodadaSeg * 1000 : null;
  return update(ref(db, `rooms/${codigo}`), {
    rodadaAtual: {
      setor,
      indice,
      texto,
      verdadeiro,
      correcao,
      girando: false,
      revelada: false,
      timerFimEm,
      votos: {},
      resultadoPorGrupo: {},
    },
  });
}

export function marcarGirando(codigo, girando) {
  return update(ref(db, `rooms/${codigo}/rodadaAtual`), { girando });
}

/**
 * Fecha a votação, calcula a maioria de cada grupo e credita pontos.
 * Recebe o estado atual da sala (já lido pelo host) para não precisar
 * de outra leitura.
 */
export async function revelarRodada(codigo, sala) {
  const { rodadaAtual, jogadores, grupos } = sala;
  if (!rodadaAtual || rodadaAtual.revelada) return;

  const votos = rodadaAtual.votos || {};
  const votosPorGrupo = {}; // { g1: { V: 2, F: 1 } }

  Object.entries(jogadores || {}).forEach(([jogadorId, j]) => {
    if (!j.grupoId) return;
    const voto = votos[jogadorId];
    if (!voto) return;
    votosPorGrupo[j.grupoId] ??= { V: 0, F: 0 };
    votosPorGrupo[j.grupoId][voto]++;
  });

  const resultadoPorGrupo = {};
  const atualizacoesGrupos = {};

  Object.keys(grupos || {}).forEach((grupoId) => {
    const contagem = votosPorGrupo[grupoId];
    if (!contagem || (contagem.V === 0 && contagem.F === 0)) {
      resultadoPorGrupo[grupoId] = { escolha: null, acertou: false };
      return;
    }
    // Empate: fica sem escolha definida (host decide manualmente se quiser).
    const escolha = contagem.V > contagem.F ? "V" : contagem.F > contagem.V ? "F" : null;
    const acertou = escolha != null && ((escolha === "V" && rodadaAtual.verdadeiro) || (escolha === "F" && !rodadaAtual.verdadeiro));
    resultadoPorGrupo[grupoId] = { escolha, acertou };
    if (acertou) {
      atualizacoesGrupos[`grupos/${grupoId}/pontos`] = (grupos[grupoId].pontos || 0) + 1;
    }
  });

  await update(ref(db, `rooms/${codigo}`), {
    "rodadaAtual/revelada": true,
    "rodadaAtual/resultadoPorGrupo": resultadoPorGrupo,
    ...atualizacoesGrupos,
  });
}

/** Ajuste manual de pontos pelo host (botões +/- do placar). */
export function ajustarPontosGrupo(codigo, grupoId, delta) {
  const pontosRef = ref(db, `rooms/${codigo}/grupos/${grupoId}/pontos`);
  return runTransaction(pontosRef, (atual) => Math.max(0, (atual || 0) + delta));
}

/* ------------------------------------------------------------------ */
/* Ações do jogador                                                     */
/* ------------------------------------------------------------------ */

export function votar(codigo, jogadorId, escolha) {
  return set(ref(db, `rooms/${codigo}/rodadaAtual/votos/${jogadorId}`), escolha);
}
