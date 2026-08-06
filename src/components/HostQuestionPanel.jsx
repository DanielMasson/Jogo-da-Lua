import { contarVotosPorGrupo } from "../utils/votos";

export default function HostQuestionPanel({ sala, girando, onRevelar }) {
  const rodada = sala?.rodadaAtual;
  const votosPorGrupo = contarVotosPorGrupo(sala);
  const gruposLista = Object.entries(sala?.grupos || {}).map(([id, g]) => ({ id, ...g }));

  const totalGrupos = gruposLista.length;
  const gruposQueVotaram = gruposLista.filter((g) => (votosPorGrupo[g.id]?.votaram || 0) > 0).length;

  return (
    <section className="jdl-panel">
      <h2>Pergunta atual</h2>

      <div className="jdl-qcard">
        {girando ? (
          <p className="jdl-placeholder">Sorteando…</p>
        ) : !rodada ? (
          <p className="jdl-placeholder">Gire a roleta para liberar a pergunta no celular dos jogadores.</p>
        ) : rodada.revelada ? (
          <p className={rodada.verdadeiro ? "jdl-true" : "jdl-false"}>
            {rodada.texto} <span className="jdl-tag">[{rodada.verdadeiro ? "V" : "F"}]</span>
          </p>
        ) : (
          <p>{rodada.texto}</p>
        )}
      </div>

      {rodada && !rodada.revelada && (
        <div className="jdl-vote-tally">
          {gruposLista.map((g) => {
            const v = votosPorGrupo[g.id] || { V: 0, F: 0, votaram: 0, totalJogadores: 0 };
            return (
              <div key={g.id} className="jdl-vote-tally-row">
                <span>{g.nome}</span>
                <span className="jdl-mono-num">
                  {v.votaram}/{v.totalJogadores} votaram — V:{v.V} F:{v.F}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <button
        className="jdl-btn jdl-btn-resposta"
        style={{ width: "100%", marginTop: 12 }}
        disabled={!rodada || rodada.revelada || girando}
        onClick={onRevelar}
      >
        {rodada && gruposQueVotaram < totalGrupos ? `Revelar resposta (${gruposQueVotaram}/${totalGrupos} grupos votaram)` : "Revelar resposta"}
      </button>

      {rodada?.revelada && (
        <div className={`jdl-acard ${rodada.verdadeiro ? "jdl-true" : "jdl-false-correction"}`} style={{ marginTop: 12 }}>
          {rodada.verdadeiro ? "VERDADEIRO" : rodada.correcao}
        </div>
      )}
    </section>
  );
}
