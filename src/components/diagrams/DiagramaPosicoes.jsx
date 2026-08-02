/**
 * Lua Nova: Sol — Lua — Terra (lado escuro voltado para a Terra)
 * Lua Cheia: Sol — Terra — Lua (lado iluminado voltado para a Terra)
 */
export const legenda =
  "Na Lua Nova, o lado escuro da Lua aponta para a Terra. Na Lua Cheia, é o lado iluminado que aponta para a Terra.";

export default function DiagramaPosicoes() {
  return (
    <svg viewBox="0 0 460 220" className="jdl-diagram">
      <radialGradient id="terraGradPosicoes" cx="35%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#bfe3d6" />
        <stop offset="100%" stopColor="#3f7f6e" />
      </radialGradient>

      <text x="20" y="45" className="jdl-svg-label">Lua Nova</text>
      <circle cx="70" cy="70" r="18" fill="#f2d477" />
      <line x1="88" y1="70" x2="200" y2="70" stroke="var(--jdl-line)" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="222" cy="70" r="9" fill="var(--jdl-void)" stroke="var(--jdl-mist)" strokeWidth="1.5" />
      <line x1="231" y1="70" x2="330" y2="70" stroke="var(--jdl-line)" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="352" cy="70" r="16" fill="url(#terraGradPosicoes)" />
      <text x="70" y="105" textAnchor="middle" className="jdl-svg-sublabel">Sol</text>
      <text x="222" y="105" textAnchor="middle" className="jdl-svg-sublabel">Lua</text>
      <text x="352" y="105" textAnchor="middle" className="jdl-svg-sublabel">Terra</text>

      <text x="20" y="155" className="jdl-svg-label">Lua Cheia</text>
      <circle cx="70" cy="180" r="18" fill="#f2d477" />
      <line x1="88" y1="180" x2="198" y2="180" stroke="var(--jdl-line)" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="220" cy="180" r="16" fill="url(#terraGradPosicoes)" />
      <line x1="238" y1="180" x2="330" y2="180" stroke="var(--jdl-line)" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="352" cy="180" r="9" fill="#dcd6c6" stroke="var(--jdl-mist)" strokeWidth="1.5" />
      <text x="70" y="212" textAnchor="middle" className="jdl-svg-sublabel">Sol</text>
      <text x="220" y="212" textAnchor="middle" className="jdl-svg-sublabel">Terra</text>
      <text x="352" y="212" textAnchor="middle" className="jdl-svg-sublabel">Lua</text>
    </svg>
  );
}
