/**
 * A partir do estado bruto da sala (Firebase), monta um resumo por grupo:
 * quantos votaram, quantos escolheram V, quantos escolheram F, e quantos
 * jogadores esse grupo tem ao todo. Usado tanto no placar quanto no card
 * da pergunta, pro anfitrião acompanhar a votação em tempo real.
 */
export function contarVotosPorGrupo(sala) {
  const jogadores = sala?.jogadores || {};
  const votos = sala?.rodadaAtual?.votos || {};
  const resumo = {};

  Object.entries(jogadores).forEach(([jogadorId, j]) => {
    if (!j.grupoId) return;
    resumo[j.grupoId] ??= { V: 0, F: 0, totalJogadores: 0, votaram: 0 };
    resumo[j.grupoId].totalJogadores++;
    const voto = votos[jogadorId];
    if (voto) {
      resumo[j.grupoId][voto]++;
      resumo[j.grupoId].votaram++;
    }
  });

  return resumo;
}
