import { Shuffle } from "lucide-react";
import { useSorteioAleatorio } from "../hooks/useSorteioAleatorio";

export default function MobileQuiz() {
  const { atual, revelada, sortear, revelar, total, vistas } = useSorteioAleatorio();

  let correcaoTexto = "";
  let correcaoClasse = "";
  if (atual && revelada) {
    correcaoTexto = atual.verdadeiro ? "VERDADEIRO" : atual.correcao;
    correcaoClasse = atual.verdadeiro ? "jdl-true" : "jdl-false-correction";
  }

  return (
    <section className="jdl-panel jdl-mobile-quiz">
      <h2>Pergunta Aleatória</h2>

      <div className="jdl-qcard">
        {!atual ? (
          <p className="jdl-placeholder">Toque no botão abaixo para sortear a primeira pergunta.</p>
        ) : revelada ? (
          <p className={atual.verdadeiro ? "jdl-true" : "jdl-false"}>
            {atual.texto} <span className="jdl-tag">[{atual.verdadeiro ? "V" : "F"}]</span>
          </p>
        ) : (
          <p>{atual.texto}</p>
        )}
      </div>

      {atual && !revelada && (
        <button className="jdl-btn jdl-btn-resposta jdl-mobile-btn" onClick={revelar}>
          Resposta
        </button>
      )}

      {atual && (
        <div className={`jdl-acard ${correcaoClasse}`}>
          {correcaoTexto || <span className="jdl-placeholder">Toque em Resposta para revelar a explicação.</span>}
        </div>
      )}

      <button className="jdl-spin-btn jdl-mobile-btn" onClick={sortear}>
        <Shuffle size={17} style={{ marginRight: 8, verticalAlign: "-3px" }} />
        {atual ? "Próxima pergunta" : "Sortear pergunta"}
      </button>

      {vistas > 0 && (
        <p className="jdl-mobile-progress">
          {vistas} de {total} perguntas vistas nesta rodada
        </p>
      )}
    </section>
  );
}
