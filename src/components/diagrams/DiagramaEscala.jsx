/**
 * Se a Terra fosse uma bola de 20 cm, a Lua ficaria a ~6 metros de distância
 * (proporcional a 384.400 km / 12.742 km de diâmetro real da Terra).
 *
 * A legenda longa é exportada à parte e renderizada como HTML normal (fora do
 * SVG), porque texto dentro de <svg> não quebra linha sozinho e acaba cortado
 * quando é mais largo que o viewBox.
 */
export const legenda = "Escala real: Terra 12.742 km · Lua 3.474 km · distância média 384.400 km";

export default function DiagramaEscala() {
  return (
    <svg viewBox="0 0 460 190" className="jdl-diagram">
      <line x1="60" y1="95" x2="400" y2="95" stroke="var(--jdl-line)" strokeWidth="2" strokeDasharray="6 6" />

      <radialGradient id="terraGradEscala" cx="35%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#bfe3d6" />
        <stop offset="100%" stopColor="#3f7f6e" />
      </radialGradient>
      <circle cx="60" cy="95" r="34" fill="url(#terraGradEscala)" stroke="var(--jdl-mint)" strokeWidth="2" />
      <text x="60" y="145" textAnchor="middle" className="jdl-svg-label">Terra</text>
      <text x="60" y="161" textAnchor="middle" className="jdl-svg-sublabel">bola de 20 cm</text>

      <circle cx="400" cy="95" r="9.5" fill="#c9c3b4" stroke="var(--jdl-mist)" strokeWidth="1.5" />
      <text x="400" y="145" textAnchor="middle" className="jdl-svg-label">Lua</text>
      <text x="400" y="161" textAnchor="middle" className="jdl-svg-sublabel">≈ 5,4 cm</text>

      <text x="230" y="55" textAnchor="middle" className="jdl-svg-highlight">≈ 6 metros de distância</text>
    </svg>
  );
}
