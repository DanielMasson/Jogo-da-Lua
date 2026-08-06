import { useState, useEffect, useCallback } from "react";
import * as roomService from "../firebase/roomService";

const LS_KEY = "jdl-jogador";

/**
 * Tudo que a tela do celular precisa. Guarda { codigo, jogadorId, nome }
 * no localStorage pra sobreviver a um refresh acidental de página durante
 * o jogo (reconecta na mesma sala/jogador em vez de pedir nome de novo).
 */
export function usePlayerRoom() {
  const [sessao, setSessao] = useState(() => {
    try {
      const salvo = localStorage.getItem(LS_KEY);
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });
  const [sala, setSala] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!sessao) return;
    const unsubscribe = roomService.ouvirSala(sessao.codigo, setSala);
    return unsubscribe;
  }, [sessao]);

  const entrar = useCallback(async (codigo, nome) => {
    setErro(null);
    try {
      const codigoLimpo = codigo.trim();
      const { jogadorId } = await roomService.entrarNaSala(codigoLimpo, nome);
      const novaSessao = { codigo: codigoLimpo, jogadorId, nome };
      localStorage.setItem(LS_KEY, JSON.stringify(novaSessao));
      setSessao(novaSessao);
    } catch (e) {
      setErro(e.message || "Não foi possível entrar na sala.");
    }
  }, []);

  const sair = useCallback(() => {
    if (sessao) roomService.marcarOffline(sessao.codigo, sessao.jogadorId);
    localStorage.removeItem(LS_KEY);
    setSessao(null);
    setSala(null);
  }, [sessao]);

  const votar = useCallback(
    (escolha) => {
      if (!sessao) return;
      roomService.votar(sessao.codigo, sessao.jogadorId, escolha);
    },
    [sessao]
  );

  const meuJogador = sessao && sala?.jogadores?.[sessao.jogadorId];
  const meuGrupoId = meuJogador?.grupoId ?? null;
  const rodada = sala?.rodadaAtual ?? null;
  const meuVoto = sessao && rodada?.votos?.[sessao.jogadorId];
  const meuResultado = meuGrupoId && rodada?.resultadoPorGrupo?.[meuGrupoId];

  return {
    sessao,
    sala,
    erro,
    entrar,
    sair,
    votar,
    meuGrupoId,
    meuGrupoNome: meuGrupoId ? sala?.grupos?.[meuGrupoId]?.nome : null,
    rodada,
    meuVoto,
    meuResultado, // { escolha, acertou } depois de revelada
  };
}
