import { useState, useRef } from "react";
import { FRASES_POR_SETOR } from "../data/perguntas";
import { useSfx } from "./useSfx";

/** Achata as 70 perguntas (7 setores x 10) numa lista única e embaralhável. */
const TODAS_PERGUNTAS = FRASES_POR_SETOR.flatMap((perguntas, setor) =>
  perguntas.map(([texto, verdadeiro, correcao], indice) => ({ setor, indice, texto, verdadeiro, correcao }))
);

/**
 * Versão para celular: sem roleta, sem setores — só sorteia uma pergunta da
 * vez direto do conjunto todo. Evita repetir uma pergunta antes de esgotar
 * as outras 69; quando todas já apareceram, a rodada reinicia sozinha.
 */
export function useSorteioAleatorio() {
  const sfx = useSfx();
  const [atual, setAtual] = useState(null);
  const [revelada, setRevelada] = useState(false);
  const usadosRef = useRef(new Set());

  function sortear() {
    sfx("spin-stop");
    if (usadosRef.current.size >= TODAS_PERGUNTAS.length) {
      usadosRef.current = new Set();
    }
    const anterior = atual?._flatIndex;
    const disponiveis = TODAS_PERGUNTAS.map((_, i) => i).filter(
      (i) => !usadosRef.current.has(i) && i !== anterior
    );
    const pool = disponiveis.length > 0 ? disponiveis : TODAS_PERGUNTAS.map((_, i) => i);
    const escolhido = pool[Math.floor(Math.random() * pool.length)];

    usadosRef.current.add(escolhido);
    setAtual({ ...TODAS_PERGUNTAS[escolhido], _flatIndex: escolhido });
    setRevelada(false);
  }

  function revelar() {
    if (!atual) return;
    sfx(atual.verdadeiro ? "correct" : "wrong");
    setRevelada(true);
  }

  return {
    atual,
    revelada,
    sortear,
    revelar,
    total: TODAS_PERGUNTAS.length,
    vistas: usadosRef.current.size,
  };
}
