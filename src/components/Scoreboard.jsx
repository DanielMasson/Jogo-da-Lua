import { Plus, Minus } from "lucide-react";

export default function Scoreboard({ grupos, travado, onEscolherResposta, onAjustarPontos, onMarcarTodos }) {
  return (
    <section className="jdl-scoreboard">
      <div className="jdl-scoreboard-header">
        <span className="jdl-scoreboard-title">Placar dos Grupos</span>
        <div className="jdl-bulk-actions">
          <button
            className="jdl-btn jdl-bulk-btn jdl-bulk-btn-v"
            disabled={travado}
            onClick={() => onMarcarTodos("V")}
          >
            Marcar todos: V
          </button>
          <button
            className="jdl-btn jdl-bulk-btn jdl-bulk-btn-f"
            disabled={travado}
            onClick={() => onMarcarTodos("F")}
          >
            Marcar todos: F
          </button>
        </div>
      </div>

      <div className="jdl-scoreboard-grid">
        {grupos.map((g, idx) => (
          <div className="jdl-group-pod" key={idx}>
            <span className="jdl-group-name">{g.nome}</span>

            <div className="jdl-vf">
              <button
                className={`jdl-vf-btn ${g.resposta === "V" ? "picked-v" : ""}`}
                disabled={travado}
                onClick={() => onEscolherResposta(idx, "V")}
              >
                V
              </button>
              <button
                className={`jdl-vf-btn ${g.resposta === "F" ? "picked-f" : ""}`}
                disabled={travado}
                onClick={() => onEscolherResposta(idx, "F")}
              >
                F
              </button>
            </div>

            <div className="jdl-score">
              <button className="jdl-score-btn" onClick={() => onAjustarPontos(idx, -1)} aria-label="Diminuir ponto">
                <Minus size={13} />
              </button>
              <span className="jdl-score-num">{g.pontos}</span>
              <button className="jdl-score-btn" onClick={() => onAjustarPontos(idx, 1)} aria-label="Aumentar ponto">
                <Plus size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
