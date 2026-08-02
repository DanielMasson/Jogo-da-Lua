export default function Header() {
  return (
    <header className="jdl-header">
      <div className="jdl-eyebrow">Roleta Astronômica</div>
      <h1 className="jdl-title">Jogo da Lua</h1>
      <p className="jdl-subtitle">Gire, escolha uma pergunta, decida entre Verdadeiro ou Falso e pontue.</p>
      <div className="jdl-phase-strip" aria-hidden="true">
        🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘
      </div>
    </header>
  );
}
