import FaseLua from "./FaseLua";

/**
 * A luz do Sol vem sempre do mesmo lado — o que muda é o quanto dessa
 * face iluminada é visível da Terra em cada ponto da órbita.
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
      </defs>

      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="10"
          y1={70 + i * 26}
          x2="150"
          y2={100 + i * 6}
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

      <FaseLua cx={210} cy={70} raio={16} iluminadoLado="direita" fracao={1} label="Cheia" />
      <FaseLua cx={340} cy={170} raio={16} iluminadoLado="esquerda" fracao={0.55} label="Minguante" />
      <FaseLua cx={210} cy={270} raio={16} iluminadoLado="nenhum" fracao={1} label="Nova" />
      <FaseLua cx={80} cy={170} raio={16} iluminadoLado="direita" fracao={0.55} label="Crescente" />
    </svg>
  );
}
