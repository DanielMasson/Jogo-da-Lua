/**
 * A órbita da Lua é inclinada ~5,1° em relação à eclíptica. Só há eclipse
 * quando a Lua Cheia/Nova coincide com a passagem por um dos nós da órbita.
 *
 * A legenda é exportada à parte e renderizada como HTML normal (fora do SVG),
 * porque texto dentro de <svg> não quebra linha sozinho.
 */
export const legenda =
  "Só há eclipse quando a Lua Cheia/Nova coincide com a Lua passando por um dos nós — por isso não acontece todo mês.";

export default function DiagramaInclinacao() {
  return (
    <svg viewBox="0 0 460 215" className="jdl-diagram">
      <ellipse cx="230" cy="150" rx="170" ry="18" fill="none" stroke="var(--jdl-mist)" strokeWidth="2" />
      <text x="230" y="182" textAnchor="middle" className="jdl-svg-sublabel">
        plano da eclíptica (órbita da Terra ao redor do Sol)
      </text>

      <ellipse
        cx="230"
        cy="150"
        rx="170"
        ry="55"
        fill="none"
        stroke="var(--jdl-gold)"
        strokeWidth="2"
        transform="rotate(-4 230 150)"
      />
      <text x="70" y="70" className="jdl-svg-sublabel">órbita da Lua (≈5,1° inclinada)</text>

      <radialGradient id="terraGradInclinacao" cx="35%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#bfe3d6" />
        <stop offset="100%" stopColor="#3f7f6e" />
      </radialGradient>
      <circle cx="230" cy="150" r="16" fill="url(#terraGradInclinacao)" />

      <circle cx="392" cy="140" r="4" fill="var(--jdl-coral)" />
      <circle cx="68" cy="160" r="4" fill="var(--jdl-coral)" />
      <text x="392" y="122" textAnchor="middle" className="jdl-svg-sublabel-red">nó</text>
      <text x="68" y="184" textAnchor="middle" className="jdl-svg-sublabel-red">nó</text>
    </svg>
  );
}
