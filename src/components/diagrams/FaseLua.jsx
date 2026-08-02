/**
 * Desenha um pequeno disco lunar com uma "sombra" que representa a fase.
 * iluminadoLado: 'nenhum' (nova) | 'direita' | 'esquerda' | 'total' (cheia)
 */
export default function FaseLua({ cx, cy, raio, iluminadoLado, fracao, label, sublabel }) {
  const gradId = `grad-${cx}-${cy}-${label}`;
  const clipId = `clip-${gradId}`;
  let overlay = null;

  if (iluminadoLado === "nenhum") {
    overlay = <circle cx={cx} cy={cy} r={raio} fill="var(--jdl-void)" />;
  } else if (iluminadoLado !== "total") {
    const dx = iluminadoLado === "direita" ? raio * fracao : -raio * fracao;
    overlay = (
      <>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={raio} />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <circle cx={cx + dx} cy={cy} r={raio} fill="var(--jdl-void)" />
        </g>
      </>
    );
  }

  return (
    <g>
      <radialGradient id={gradId} cx="35%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#f4ecd8" />
        <stop offset="100%" stopColor="#b9b3a0" />
      </radialGradient>
      <circle cx={cx} cy={cy} r={raio} fill={`url(#${gradId})`} stroke="var(--jdl-line)" strokeWidth="1" />
      {overlay}
      {label && (
        <text x={cx} y={cy + raio + 16} textAnchor="middle" className="jdl-svg-label">
          {label}
        </text>
      )}
      {sublabel && (
        <text x={cx} y={cy + raio + 30} textAnchor="middle" className="jdl-svg-sublabel">
          {sublabel}
        </text>
      )}
    </g>
  );
}
