import DiagramaEscala, { legenda as legendaEscala } from "./DiagramaEscala";
import DiagramaInclinacao, { legenda as legendaInclinacao } from "./DiagramaInclinacao";
import DiagramaPosicoes, { legenda as legendaPosicoes } from "./DiagramaPosicoes";
import DiagramaFases, { legenda as legendaFases } from "./DiagramaFases";

/**
 * Cada entrada junta o componente do desenho com sua legenda em texto.
 * A legenda é renderizada como HTML normal fora do <svg> (ver BonusModal),
 * já que texto dentro de SVG não quebra linha sozinho.
 */
export const DIAGRAMAS = {
  1: { Componente: DiagramaEscala, legenda: legendaEscala },
  2: { Componente: DiagramaInclinacao, legenda: legendaInclinacao },
  3: { Componente: DiagramaPosicoes, legenda: legendaPosicoes },
  4: { Componente: DiagramaFases, legenda: legendaFases },
};
