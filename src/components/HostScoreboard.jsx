import { Plus, Minus } from "lucide-react";
import { contarVotosPorGrupo } from "../utils/votos";

export default function HostScoreboard({ sala, onAjustarPontos }) {
  const gruposLista = Object.entries(sala?.grupos || {}).map(([id, g]) => ({ id, ...g }));
  const votosPorGrupo = contarVotosPorGrupo(sala);

  if (gruposLista.length === 0) return null;

  return (
    <section className="jdl-scoreboard">
      <div className="jdl-scoreboard-header">
        <span className="jdl-scoreboard-title">Placar dos Grupos</span>
      </div>

      <div className="jdl-scoreboard-grid">
        {gruposLista.map((g) => {
          const v = votosPorGrupo[g.id];
          return (
            <div className="jdl-group-pod" key={g.id}>
              <span className="jdl-group-name">{g.nome}</span>
              {v && <span className="jdl-group-count">{v.totalJogadores} jogador(es)</span>}

              <div className="jdl-score">
                <button className="jdl-score-btn" onClick={() => onAjustarPontos(g.id, -1)} aria-label="Diminuir ponto">
                  <Minus size={13} />
                </button>
                <span className="jdl-score-num">{g.pontos || 0}</span>
                <button className="jdl-score-btn" onClick={() => onAjustarPontos(g.id, 1)} aria-label="Aumentar ponto">
                  <Plus size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
