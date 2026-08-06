import { useState } from "react";

export default function PlayerJoin({ onEntrar, erro }) {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim() || codigo.trim().length !== 4) return;
    setEnviando(true);
    await onEntrar(codigo, nome);
    setEnviando(false);
  }

  return (
    <section className="jdl-panel" style={{ maxWidth: 340, margin: "40px auto" }}>
      <h2>Entrar no jogo</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          className="jdl-input"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          maxLength={24}
          autoFocus
        />
        <input
          className="jdl-input"
          placeholder="Código da sala (4 dígitos)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 4))}
          inputMode="numeric"
        />
        {erro && <p className="jdl-false" style={{ fontSize: 13 }}>{erro}</p>}
        <button className="jdl-btn jdl-btn-resposta" disabled={enviando || !nome.trim() || codigo.length !== 4}>
          {enviando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </section>
  );
}
