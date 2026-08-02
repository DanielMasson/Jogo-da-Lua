import { SETORES } from "../data/setores";
import RoletaSvg from "./RoletaSvg";

export default function Roleta({ destaque, setorAtual, girando, onGirar }) {
  return (
    <section className="jdl-panel jdl-wheel-zone">
      <div className="jdl-wheel-wrap">
        <RoletaSvg destaque={destaque} setorAtual={setorAtual} girando={girando} />
      </div>

      <button className="jdl-spin-btn" onClick={onGirar} disabled={girando}>
        {girando ? "Girando…" : "Girar"}
      </button>

      <p className="jdl-feedback">
        {girando ? (
          "Sorteando um setor…"
        ) : setorAtual == null ? (
          "Clique em Girar para começar!"
        ) : (
          <>
            Setor sorteado: <strong>{SETORES[setorAtual].letra}</strong> — {SETORES[setorAtual].titulo}
          </>
        )}
      </p>
    </section>
  );
}
