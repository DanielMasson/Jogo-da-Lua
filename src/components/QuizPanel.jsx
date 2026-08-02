import { FRASES_POR_SETOR } from "../data/perguntas";

export default function QuizPanel({
  setorAtual,
  estados,
  perguntaAtiva,
  revelada,
  girando,
  onSelecionar,
  onRevelar,
}) {
  const { cardPergunta, correcaoTexto, correcaoClasse } = montarConteudo(setorAtual, perguntaAtiva, revelada);

  const respostaDesabilitada =
    setorAtual == null || perguntaAtiva == null || revelada === true || revelada === "bloqueada";

  return (
    <section className="jdl-panel">
      <h2>Verdadeiro ou Falso</h2>

      <div className="jdl-qgrid">
        {Array.from({ length: 10 }, (_, i) => {
          const estado = setorAtual == null ? 0 : estados[setorAtual][i];
          const classe = estado === 2 ? "is-answered" : perguntaAtiva === i ? "is-active" : "";
          return (
            <button
              key={i}
              className={`jdl-qbtn ${classe}`}
              disabled={setorAtual == null || girando}
              onClick={() => onSelecionar(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="jdl-qcard">{cardPergunta}</div>

      <button
        className="jdl-btn jdl-btn-resposta"
        style={{ width: "100%", marginBottom: 12 }}
        disabled={respostaDesabilitada}
        onClick={onRevelar}
      >
        Resposta
      </button>

      <div className={`jdl-acard ${correcaoClasse}`}>
        {correcaoTexto || <span className="jdl-placeholder">A explicação aparece aqui depois de revelar a resposta.</span>}
      </div>
    </section>
  );
}

/** Decide o que mostrar no card da pergunta e no card de correção. */
function montarConteudo(setorAtual, perguntaAtiva, revelada) {
  if (setorAtual == null) {
    return { cardPergunta: <p className="jdl-placeholder">Gire a roleta para carregar as perguntas do setor sorteado.</p>, correcaoTexto: "", correcaoClasse: "" };
  }
  if (perguntaAtiva == null) {
    return { cardPergunta: <p className="jdl-placeholder">Escolha uma das 10 perguntas abaixo.</p>, correcaoTexto: "", correcaoClasse: "" };
  }
  if (revelada === "bloqueada") {
    return { cardPergunta: <p className="jdl-answered-msg">Esta pergunta já foi respondida.</p>, correcaoTexto: "", correcaoClasse: "" };
  }

  const [texto, verdadeiro, correcao] = FRASES_POR_SETOR[setorAtual][perguntaAtiva];

  if (revelada === true) {
    return {
      cardPergunta: (
        <p className={verdadeiro ? "jdl-true" : "jdl-false"}>
          {texto} <span className="jdl-tag">[{verdadeiro ? "V" : "F"}]</span>
        </p>
      ),
      correcaoTexto: verdadeiro ? "VERDADEIRO" : correcao,
      correcaoClasse: verdadeiro ? "jdl-true" : "jdl-false-correction",
    };
  }

  return { cardPergunta: <p>{texto}</p>, correcaoTexto: "", correcaoClasse: "" };
}
