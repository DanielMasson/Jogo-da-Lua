/**
 * A órbita da Lua é inclinada ~5,1° em relação à eclíptica. Só há eclipse
 * quando a Lua Cheia/Nova coincide com a passagem por um dos nós da órbita.
 *
 * Os "nós" (pontos onde a órbita da Lua cruza o plano da eclíptica) são
 * marcados com um × vermelho — de propósito NÃO parecem a Lua, pra não
 * confundir com um corpo celeste. A Lua em si aparece como um disco claro
 * (gradiente bem suave, sem "lado escuro" marcado) em um ponto qualquer da
 * órbita, só para situar visualmente por onde ela passa — não representa
 * nenhuma fase específica, por isso o brilho é bem uniforme (parece cheia).
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

      {/* Lua: um ponto qualquer da órbita, só para mostrar por onde ela passa.
          Gradiente centrado (sem highlight deslocado) para não parecer sombreada. */}
      <radialGradient id="moonGradInclinacao" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#f4ecd8" />
        <stop offset="100%" stopColor="#dcd6c6" />
      </radialGradient>
      <circle cx="168" cy="99" r="10" fill="url(#moonGradInclinacao)" stroke="var(--jdl-mist)" strokeWidth="1" />
      <text x="168" y="85" textAnchor="middle" className="jdl-svg-sublabel">Lua</text>

      {/* Nós: marcados em × (não são a Lua) */}
      <g stroke="var(--jdl-coral)" strokeWidth="2" strokeLinecap="round">
        <line x1="396" y1="144" x2="404" y2="152" />
        <line x1="404" y1="144" x2="396" y2="152" />
      </g>
 
      <g stroke="var(--jdl-coral)" strokeWidth="2" strokeLinecap="round">
        <line x1="56" y1="148" x2="64" y2="156" />
        <line x1="64" y1="148" x2="56" y2="156" />
      </g>
    </svg>
  );
}
