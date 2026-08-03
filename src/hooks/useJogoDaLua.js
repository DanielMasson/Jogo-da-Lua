import { useState, useRef, useEffect } from "react";
import { SETORES } from "../data/setores";
import { FRASES_POR_SETOR } from "../data/perguntas";
import { useSfx } from "./useSfx";

const NUM_SETORES = SETORES.length;
const NUM_GRUPOS = 6;

/**
 * Toda a lógica do jogo mora aqui, separada dos componentes visuais.
 * Os componentes só leem o que esse hook devolve e chamam as ações.
 */
export function useJogoDaLua() {
  const sfx = useSfx();

  const [grupos, setGrupos] = useState(
    Array.from({ length: NUM_GRUPOS }, (_, i) => ({ nome: `Grupo ${i + 1}`, pontos: 0, resposta: null }))
  );
  const [travado, setTravado] = useState(false);

  const [girando, setGirando] = useState(false);
  const [destaque, setDestaque] = useState(null);
  const [setorAtual, setSetorAtual] = useState(null);
  const timeoutRef = useRef(null);

  const [estados, setEstados] = useState(() =>
    Object.fromEntries(SETORES.map((_, i) => [i, Array(10).fill(0)]))
  );
  const [perguntaAtiva, setPerguntaAtiva] = useState(null);
  const [revelada, setRevelada] = useState(false); // false | true | 'bloqueada'

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function girar() {
    if (girando) return;
    setGirando(true);
    setPerguntaAtiva(null);
    setRevelada(false);
    setTravado(false);
    setGrupos((gs) => gs.map((g) => ({ ...g, resposta: null })));

    const final = Math.floor(Math.random() * NUM_SETORES);
    const voltas = 3;
    const passosTotais = voltas * NUM_SETORES + final;
    let passo = 0;
    let atraso = 30;

    function tick() {
      setDestaque(passo % NUM_SETORES);
      sfx("spin");
      if (passo >= passosTotais) {
        setDestaque(final);
        setSetorAtual(final);
        setGirando(false);
        sfx("spin-stop");
        return;
      }
      passo++;
      if (atraso < 200) atraso *= 1.05;
      timeoutRef.current = setTimeout(tick, atraso);
    }
    tick();
  }

  function selecionarPergunta(i) {
    if (setorAtual == null || girando) return;
    if (estados[setorAtual][i] === 2) {
      sfx("click");
      setPerguntaAtiva(i);
      setRevelada("bloqueada");
      return;
    }
    sfx("select");
    setPerguntaAtiva(i);
    setRevelada(false);
    setEstados((e) => {
      const copia = { ...e, [setorAtual]: [...e[setorAtual]] };
      copia[setorAtual][i] = 1;
      return copia;
    });
  }

  function revelarResposta() {
    if (setorAtual == null || perguntaAtiva == null || revelada === true || revelada === "bloqueada") return;
    const [, verdadeiro] = FRASES_POR_SETOR[setorAtual][perguntaAtiva];

    sfx(verdadeiro ? "correct" : "wrong");

    setGrupos((gs) =>
      gs.map((g) => {
        if ((g.resposta === "V" && verdadeiro) || (g.resposta === "F" && !verdadeiro)) {
          return { ...g, pontos: g.pontos + 1 };
        }
        return g;
      })
    );
    setTravado(true);
    setRevelada(true);
    setEstados((e) => {
      const copia = { ...e, [setorAtual]: [...e[setorAtual]] };
      copia[setorAtual][perguntaAtiva] = 2;
      return copia;
    });
  }

  function escolherResposta(idx, resposta) {
    if (travado) return;
    sfx("toggle");
    setGrupos((gs) => gs.map((g, i) => (i === idx ? { ...g, resposta } : g)));
  }

  /** Marca a mesma resposta (V ou F) para todos os grupos de uma vez. */
  function marcarTodosComo(resposta) {
    if (travado) return;
    sfx("toggle");
    setGrupos((gs) => gs.map((g) => ({ ...g, resposta })));
  }

  function ajustarPontos(idx, delta) {
    sfx("score");
    setGrupos((gs) => gs.map((g, i) => (i === idx ? { ...g, pontos: Math.max(0, g.pontos + delta) } : g)));
  }

  return {
    // estado
    grupos,
    travado,
    girando,
    destaque,
    setorAtual,
    estados,
    perguntaAtiva,
    revelada,
    // ações
    girar,
    selecionarPergunta,
    revelarResposta,
    escolherResposta,
    ajustarPontos,
    marcarTodosComo,
  };
}
