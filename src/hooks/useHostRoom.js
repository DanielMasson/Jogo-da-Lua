import { useState, useEffect, useRef, useCallback } from "react";
import { SETORES } from "../data/setores";
import { FRASES_POR_SETOR } from "../data/perguntas";
import * as roomService from "../firebase/roomService";

const NUM_SETORES = SETORES.length;

/**
 * Tudo que a tela do anfitrião (PC) precisa: estado ao vivo da sala +
 * ações que escrevem no Firebase. Mesma mecânica de sorteio visual
 * (voltas + desaceleração) que já existia em useJogoDaLua, só que agora
 * ao final publica a pergunta pro Firebase em vez de guardar local.
 */
export function useHostRoom() {
  const [codigo, setCodigo] = useState(null);
  const [sala, setSala] = useState(null);
  const [girandoLocal, setGirandoLocal] = useState(false);
  const [destaque, setDestaque] = useState(null);
  const timeoutRef = useRef(null);
  const usadosPorSetorRef = useRef(Object.fromEntries(SETORES.map((_, i) => [i, new Set()])));

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  useEffect(() => {
    if (!codigo) return;
    const unsubscribe = roomService.ouvirSala(codigo, setSala);
    return unsubscribe;
  }, [codigo]);

  const criarSala = useCallback(async (opts) => {
    const { codigo: novoCodigo } = await roomService.criarSala(opts);
    setCodigo(novoCodigo);
    return novoCodigo;
  }, []);

  const formarGruposAleatorio = useCallback(
    (numGrupos) => {
      if (!codigo || !sala) return;
      const jogadoresIds = Object.keys(sala.jogadores || {});
      const embaralhados = [...jogadoresIds].sort(() => Math.random() - 0.5);

      const grupos = {};
      for (let i = 0; i < numGrupos; i++) {
        grupos[`g${i + 1}`] = { nome: `Grupo ${i + 1}`, pontos: 0 };
      }
      const atribuicoes = embaralhados.map((jogadorId, i) => ({
        jogadorId,
        grupoId: `g${(i % numGrupos) + 1}`,
      }));

      roomService.formarGrupos(codigo, grupos);
      atribuicoes.forEach(({ jogadorId, grupoId }) => roomService.atribuirJogadorAoGrupo(codigo, jogadorId, grupoId));
    },
    [codigo, sala]
  );

  const criarGruposVazios = useCallback(
    (numGrupos) => {
      if (!codigo) return;
      const grupos = {};
      for (let i = 0; i < numGrupos; i++) {
        grupos[`g${i + 1}`] = { nome: `Grupo ${i + 1}`, pontos: 0 };
      }
      roomService.formarGrupos(codigo, grupos);
    },
    [codigo]
  );

  const moverJogador = useCallback(
    (jogadorId, grupoId) => {
      if (!codigo) return;
      roomService.atribuirJogadorAoGrupo(codigo, jogadorId, grupoId);
    },
    [codigo]
  );

  const iniciarJogo = useCallback(() => codigo && roomService.iniciarJogo(codigo), [codigo]);

  function sortearPerguntaDoSetor(setor) {
    const usados = usadosPorSetorRef.current[setor];
    if (usados.size >= 10) usados.clear();
    const disponiveis = Array.from({ length: 10 }, (_, i) => i).filter((i) => !usados.has(i));
    const indice = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    usados.add(indice);
    const [texto, verdadeiro, correcao] = FRASES_POR_SETOR[setor][indice];
    return { setor, indice, texto, verdadeiro, correcao };
  }

  const girar = useCallback(() => {
    if (!codigo || girandoLocal) return;
    setGirandoLocal(true);
    roomService.marcarGirando(codigo, true);

    const final = Math.floor(Math.random() * NUM_SETORES);
    const voltas = 3;
    const passosTotais = voltas * NUM_SETORES + final;
    let passo = 0;
    let atraso = 30;

    function tick() {
      setDestaque(passo % NUM_SETORES);
      if (passo >= passosTotais) {
        setDestaque(final);
        setGirandoLocal(false);
        const pergunta = sortearPerguntaDoSetor(final);
        roomService.iniciarRodada(codigo, {
          ...pergunta,
          duracaoRodadaSeg: sala?.config?.duracaoRodadaSeg ?? 30,
        });
        return;
      }
      passo++;
      if (atraso < 200) atraso *= 1.05;
      timeoutRef.current = setTimeout(tick, atraso);
    }
    tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigo, girandoLocal, sala]);

  const revelar = useCallback(() => {
    if (!codigo || !sala) return;
    roomService.revelarRodada(codigo, sala);
  }, [codigo, sala]);

  const ajustarPontos = useCallback((grupoId, delta) => codigo && roomService.ajustarPontosGrupo(codigo, grupoId, delta), [codigo]);

  const encerrar = useCallback(() => {
    if (!codigo) return;
    roomService.encerrarSala(codigo);
    setCodigo(null);
    setSala(null);
  }, [codigo]);

  return {
    codigo,
    sala,
    girando: girandoLocal,
    destaque,
    setorAtual: sala?.rodadaAtual?.setor ?? null,
    criarSala,
    formarGruposAleatorio,
    criarGruposVazios,
    moverJogador,
    iniciarJogo,
    girar,
    revelar,
    ajustarPontos,
    encerrar,
  };
}
