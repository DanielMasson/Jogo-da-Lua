export default function PlayerVote({ sala, rodada, meuGrupoNome, meuVoto, meuResultado, onVotar }) {
  if (sala.status === "lobby" || sala.status === "grupos") {
    return (
      <section className="jdl-panel" style={{ maxWidth: 380, margin: "40px auto", textAlign: "center" }}>
        <h2>Aguardando o anfitrião…</h2>
        <p className="jdl-placeholder">
          {meuGrupoNome ? `Você está no ${meuGrupoNome}. ` : ""}
          O jogo começa assim que o anfitrião formar os grupos e iniciar.
        </p>
      </section>
    );
  }

  if (!rodada) {
    return (
      <section className="jdl-panel" style={{ maxWidth: 380, margin: "40px auto", textAlign: "center" }}>
        <h2>{meuGrupoNome}</h2>
        <p className="jdl-placeholder">Aguardando o anfitrião girar a roleta…</p>
      </section>
    );
  }

  return (
    <section className="jdl-panel" style={{ maxWidth: 380, margin: "40px auto" }}>
      <h2>{meuGrupoNome}</h2>

      <div className="jdl-qcard">
        {rodada.revelada ? (
          <p className={rodada.verdadeiro ? "jdl-true" : "jdl-false"}>
            {rodada.texto} <span className="jdl-tag">[{rodada.verdadeiro ? "V" : "F"}]</span>
          </p>
        ) : (
          <p>{rodada.texto}</p>
        )}
      </div>

      {!rodada.revelada && (
        <div className="jdl-mobile-vf">
          <button
            className={`jdl-vf-btn-lg ${meuVoto === "V" ? "picked-v" : ""}`}
            onClick={() => onVotar("V")}
          >
            Verdadeiro
          </button>
          <button
            className={`jdl-vf-btn-lg ${meuVoto === "F" ? "picked-f" : ""}`}
            onClick={() => onVotar("F")}
          >
            Falso
          </button>
        </div>
      )}

      {!rodada.revelada && meuVoto && (
        <p className="jdl-mobile-progress">Voto registrado! Aguardando o tempo/anfitrião fechar a votação.</p>
      )}

      {rodada.revelada && meuResultado && (
        <p className={`jdl-resultado ${meuResultado.acertou ? "jdl-true" : "jdl-false"}`}>
          {meuResultado.escolha == null
            ? "Seu grupo empatou nos votos — sem ponto."
            : meuResultado.acertou
            ? "Seu grupo acertou! 🎉"
            : "Seu grupo errou."}
        </p>
      )}
    </section>
  );
}
