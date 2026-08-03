import { SETORES } from "../data/setores";
import { useJogoMobile } from "../hooks/useJogoMobile";
import RoletaSvg from "./RoletaSvg";

export default function MobileQuiz() {
  const { girando, destaque, setorAtual, pergunta, minhaResposta, revelada, acertou, girar, escolherResposta, revelar } =
    useJogoMobile();

  return (
    <section className="jdl-panel jdl-mobile-quiz">
      <h2>Roleta da Lua</h2>

      <div className="jdl-wheel-wrap jdl-wheel-wrap-mobile">
        <RoletaSvg destaque={destaque} setorAtual={setorAtual} girando={girando} />
      </div>

      <p className="jdl-feedback">
        {girando ? (
          "Sorteando um setor…"
        ) : setorAtual == null ? (
          "Toque em Girar para sortear uma pergunta!"
        ) : (
          <>
            Setor sorteado: <strong>{SETORES[setorAtual].letra}</strong> — {SETORES[setorAtual].titulo}
          </>
        )}
      </p>

      {!girando && (
        <button className="jdl-spin-btn jdl-mobile-btn" onClick={girar}>
          {pergunta ? "Girar novamente" : "Girar"}
        </button>
      )}

      {pergunta && (
        <>
          <div className="jdl-qcard">
            {revelada ? (
              <p className={pergunta.verdadeiro ? "jdl-true" : "jdl-false"}>
                {pergunta.texto} <span className="jdl-tag">[{pergunta.verdadeiro ? "V" : "F"}]</span>
              </p>
            ) : (
              <p>{pergunta.texto}</p>
            )}
          </div>

          {!revelada && (
            <>
              <div className="jdl-mobile-vf">
                <button
                  className={`jdl-vf-btn-lg ${minhaResposta === "V" ? "picked-v" : ""}`}
                  onClick={() => escolherResposta("V")}
                >
                  Verdadeiro
                </button>
                <button
                  className={`jdl-vf-btn-lg ${minhaResposta === "F" ? "picked-f" : ""}`}
                  onClick={() => escolherResposta("F")}
                >
                  Falso
                </button>
              </div>

              <button
                className="jdl-btn jdl-btn-resposta jdl-mobile-btn"
                disabled={minhaResposta == null}
                onClick={revelar}
              >
                Resposta
              </button>
            </>
          )}

          {revelada && (
            <>
              <p className={`jdl-resultado ${acertou ? "jdl-true" : "jdl-false"}`}>
                {acertou ? "Você acertou! 🎉" : "Você errou."}
              </p>
              <div className={`jdl-acard ${pergunta.verdadeiro ? "jdl-true" : "jdl-false-correction"}`}>
                {pergunta.verdadeiro ? "VERDADEIRO" : pergunta.correcao}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
