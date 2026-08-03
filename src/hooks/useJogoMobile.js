import { useState, useRef, useEffect } from "react";
import { SETORES } from "../data/setores";
import { FRASES_POR_SETOR } from "../data/perguntas";
import { tocarTiqueRoleta, tocarAcerto, tocarErro } from "../utils/sound";

const NUM_SETORES = SETORES.length;
const PERGUNTAS_POR_SETOR = 10;

/**
 * Versão mobile: a roleta gira de verdade (mesmo desenho e mesma mecânica de
 * sorteio do desktop). Ao parar num setor, sorteia uma pergunta desse setor
 * na hora — sem precisar escolher o número manualmente. O jogador escolhe
 * V ou F e só depois toca em Resposta pra conferir se acertou.
 */
export function useJogoMobile() {
  const [girando, setGirando] = useState(false);
  const [destaque, setDestaque] = useState(null);
  const [setorAtual, setSetorAtual] = useState(null);
  const timeoutRef = useRef(null);

  // Guarda, por setor, quais índices (0-9) já saíram nesta rodada — evita
  // repetir uma pergunta do mesmo setor antes de esgotar as outras 9.
  const usadosPorSetorRef = useRef(Object.fromEntries(SETORES.map((_, i) => [i, new Set()])));

  const [pergunta, setPergunta] = useState(null); // { setor, indice, texto, verdadeiro, correcao }
  const [minhaResposta, setMinhaResposta] = useState(null); // 'V' | 'F' | null
  const [revelada, setRevelada] = useState(false);
  const [acertou, setAcertou] = useState(null); // bool | null

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function sortearPerguntaDoSetor(setor) {
    const usados = usadosPorSetorRef.current[setor];
    if (usados.size >= PERGUNTAS_POR_SETOR) usados.clear();

    const disponiveis = Array.from({ length: PERGUNTAS_POR_SETOR }, (_, i) => i).filter((i) => !usados.has(i));
    const indice = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    usados.add(indice);

    const [texto, verdadeiro, correcao] = FRASES_POR_SETOR[setor][indice];
    return { setor, indice, texto, verdadeiro, correcao };
  }

  function girar() {
    if (girando) return;
    setGirando(true);
    setPergunta(null);
    setMinhaResposta(null);
    setRevelada(false);
    setAcertou(null);

    const final = Math.floor(Math.random() * NUM_SETORES);
    const voltas = 3;
    const passosTotais = voltas * NUM_SETORES + final;
    let passo = 0;
    let atraso = 30;

    function tick() {
      setDestaque(passo % NUM_SETORES);
      tocarTiqueRoleta();
      if (passo >= passosTotais) {
        setDestaque(final);
        setSetorAtual(final);
        setPergunta(sortearPerguntaDoSetor(final));
        setGirando(false);
        return;
      }
      passo++;
      if (atraso < 200) atraso *= 1.05;
      timeoutRef.current = setTimeout(tick, atraso);
    }
    tick();
  }

  function escolherResposta(resposta) {
    if (revelada) return;
    setMinhaResposta(resposta);
  }

  function revelar() {
    if (!pergunta || minhaResposta == null || revelada) return;
    const certo = (minhaResposta === "V" && pergunta.verdadeiro) || (minhaResposta === "F" && !pergunta.verdadeiro);
    setAcertou(certo);
    setRevelada(true);
    if (certo) tocarAcerto();
    else tocarErro();
  }

  return {
    girando,
    destaque,
    setorAtual,
    pergunta,
    minhaResposta,
    revelada,
    acertou,
    girar,
    escolherResposta,
    revelar,
  };
}
