import { SETORES } from "../data/setores";
import { polarToCartesian, wedgePath } from "../utils/geometry";

const NUM_SETORES = SETORES.length;
const CX = 150, CY = 150, RAIO_SETOR = 132, RAIO_LUA = 128;

/**
 * Só o desenho da roleta, sem botão nem texto de feedback. `destaque` e
 * `setorAtual` são opcionais — sem eles (uso ilustrativo, ex.: mobile) o
 * desenho aparece com os 7 setores normais, nenhum aceso ou selecionado.
 */
export default function RoletaSvg({ destaque = null, setorAtual = null, girando = false }) {
  return (
    <svg viewBox="0 0 300 300" width="100%" height="100%">
      <defs>
        <radialGradient id="moonSurface" cx="38%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#dcd6c6" />
          <stop offset="55%" stopColor="#a8a396" />
          <stop offset="100%" stopColor="#706c60" />
        </radialGradient>
        <clipPath id="moonClip">
          <circle cx={CX} cy={CY} r={RAIO_LUA} />
        </clipPath>
      </defs>

      <circle cx={CX} cy={CY} r={RAIO_LUA} fill="url(#moonSurface)" />
      <g clipPath="url(#moonClip)" opacity="0.35">
        <circle cx="95" cy="110" r="20" fill="#5f5b50" />
        <circle cx="190" cy="90" r="14" fill="#5f5b50" />
        <circle cx="205" cy="190" r="26" fill="#5f5b50" />
        <circle cx="110" cy="205" r="11" fill="#5f5b50" />
        <circle cx="150" cy="150" r="9" fill="#4c4940" />
      </g>
      <circle cx={CX} cy={CY} r={RAIO_LUA} fill="none" stroke="var(--jdl-line)" strokeWidth="2" />

      {SETORES.map((s, i) => {
        const passoAngulo = 360 / NUM_SETORES;
        const inicio = i * passoAngulo;
        const fim = inicio + passoAngulo;
        const meio = (inicio + fim) / 2;
        const pos = polarToCartesian(CX, CY, RAIO_SETOR * 0.72, meio);
        const classe = destaque === i ? "is-lit" : setorAtual === i && !girando ? "is-selected" : "";
        return (
          <g key={i}>
            <path d={wedgePath(CX, CY, RAIO_SETOR, inicio, fim)} className={`jdl-wedge ${classe}`} />
            <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" className="jdl-wedge-label">
              {s.letra}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
