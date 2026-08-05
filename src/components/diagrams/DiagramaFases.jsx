import FaseLua from "./FaseLua";

/**
 * A luz do Sol vem sempre do mesmo lado — o que muda é o quanto dessa
 * face iluminada é visível da Terra em cada ponto da órbita.
 *
 * As setas representam raios de luz PARALELOS saindo do Sol (ícone à
 * esquerda). O rótulo "Sol" fica ACIMA do ícone (não abaixo) para não
 * colar no rótulo "Crescente", que fica pertinho dali.
 *
 * A legenda é exportada à parte e renderizada como HTML normal (fora do SVG),
 * porque texto dentro de <svg> não quebra linha sozinho.
 */
export const legenda =
  "A luz do Sol vem sempre do mesmo lado — o que muda é o quanto dessa face iluminada vemos da Terra.";

export default function DiagramaFases() {
  return (
    <svg viewBox="0 0 420 325" className="jdl-diagram">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--jdl-gold)" />
        </marker>
        <radialGradient id="solGradFases" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="100%" stopColor="#f0d889" />
        </radialGradient>
      </defs>

      {/* Sol: fonte da luz, à esquerda. Rótulo em cima do ícone (não embaixo,
          pra não colar no rótulo "Crescente" logo ali ao lado). */}
      <circle cx="20" cy="170" r="13" fill="url(#solGradFases)" />
      <text x="20" y="151" textAnchor="middle" className="jdl-svg-sublabel">Sol</text>

      {/* Raios de luz paralelos (mesma direção, sem convergir) */}
      {[130, 170, 210].map((y) => (
        <line
          key={y}
          x1="38"
          y1={y}
          x2="56"
          y2={y}
          stroke="var(--jdl-gold)"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
      ))}

      <radialGradient id="terraGradFases" cx="35%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#bfe3d6" />
        <stop offset="100%" stopColor="#3f7f6e" />
      </radialGradient>
      <circle cx="210" cy="170" r="26" fill="url(#terraGradFases)" />
      <text x="210" y="176" textAnchor="middle" className="jdl-svg-earth-label">Terra</text>

      {/* iluminadoLado="total" = disco 100% iluminado, sem sombra. */}
      <FaseLua cx={80} cy={170} raio={16} iluminadoLado="nenhum" fracao={1} label="Nova" />
      <FaseLua cx={210} cy={270} raio={16} iluminadoLado="direita" fracao={0.55} label="Minguante" />
      <FaseLua cx={340} cy={170} raio={16} iluminadoLado="total" label="Cheia" />
      <FaseLua cx={210} cy={70} raio={16} iluminadoLado="direita" fracao={0.55} label="Crescente" />
    </svg>
  );
}
