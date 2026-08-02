import { useState, useEffect } from "react";

/**
 * true quando a largura da tela é <= breakpointPx (por padrão, tamanho de celular).
 * Reage a mudanças de tamanho da janela (ex.: girar o celular, redimensionar).
 */
export function useIsMobile(breakpointPx = 768) {
  const query = `(max-width: ${breakpointPx}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
}
