/**
 * Motor de efeitos sonoros dos botões do jogo.
 *
 * COMO COLOCAR SEUS PRÓPRIOS ARQUIVOS:
 * Salve arquivos .mp3 dentro de `public/sounds/` com estes nomes exatos:
 *
 *   click.mp3       clique genérico (fechar modal, pergunta bônus, etc.)
 *   select.mp3      selecionar uma das 10 perguntas do setor
 *   reveal.mp3      revelar a resposta (botão "Resposta")
 *   correct.mp3     resposta é Verdadeiro
 *   wrong.mp3       resposta é Falso
 *   spin.mp3        cada "passo" da roleta girando (curto, toca várias vezes)
 *   spin-stop.mp3   roleta para de girar no setor sorteado
 *   score.mp3       ajustar pontuação no placar (+ / -)
 *   toggle.mp3      marcar V/F, marcar todos, abrir/fechar painéis
 *
 * Se um arquivo não existir (ou falhar ao carregar), o efeito correspondente
 * é automaticamente substituído por um beep sintetizado na hora via Web
 * Audio API — sem precisar de nenhum arquivo e sem quebrar nada. Todos os
 * sons sintetizados são gerados pela mesma função (playSynth), só mudando a
 * "receita" de tons (frequência/duração/tipo de onda) em SYNTH_PRESETS.
 */

const SOUND_FILES = {
  click: "/sounds/click.mp3",
  select: "/sounds/select.mp3",
  reveal: "/sounds/reveal.mp3",
  correct: "/sounds/correct.mp3",
  wrong: "/sounds/wrong.mp3",
  spin: "/sounds/spin.mp3",
  "spin-stop": "/sounds/spin-stop.mp3",
  score: "/sounds/score.mp3",
  toggle: "/sounds/toggle.mp3",
};

/** Cada som sintetizado é uma pequena sequência de tons (osciladores). */
const SYNTH_PRESETS = {
  click: [{ freq: 720, dur: 0.05, type: "square", gain: 0.16 }],
  select: [{ freq: 520, dur: 0.06, type: "triangle", gain: 0.16 }],
  reveal: [
    { freq: 440, dur: 0.07, type: "sine", gain: 0.18 },
    { freq: 660, dur: 0.09, type: "sine", gain: 0.16, delay: 0.06 },
  ],
  correct: [
    { freq: 523.25, dur: 0.09, type: "sine", gain: 0.18 },
    { freq: 659.25, dur: 0.09, type: "sine", gain: 0.18, delay: 0.09 },
    { freq: 783.99, dur: 0.14, type: "sine", gain: 0.18, delay: 0.18 },
  ],
  wrong: [
    { freq: 300, dur: 0.12, type: "sawtooth", gain: 0.14 },
    { freq: 190, dur: 0.18, type: "sawtooth", gain: 0.14, delay: 0.1 },
  ],
  spin: [{ freq: 300, dur: 0.035, type: "square", gain: 0.07 }],
  "spin-stop": [
    { freq: 660, dur: 0.06, type: "triangle", gain: 0.18 },
    { freq: 880, dur: 0.12, type: "triangle", gain: 0.18, delay: 0.05 },
  ],
  score: [{ freq: 900, dur: 0.045, type: "square", gain: 0.14 }],
  toggle: [{ freq: 500, dur: 0.05, type: "sine", gain: 0.14 }],
};

let audioCtx = null;
function getCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/** Toca a sequência de tons sintetizados de um preset. */
function playSynth(name, volume) {
  const preset = SYNTH_PRESETS[name];
  if (!preset) return;
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;

    preset.forEach(({ freq, dur, type, gain, delay = 0 }) => {
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      const start = now + delay;
      const peak = Math.max(0.0001, gain * volume);
      amp.gain.setValueAtTime(0.0001, start);
      amp.gain.exponentialRampToValueAtTime(peak, start + 0.008);
      amp.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(amp).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.02);
    });
  } catch {
    // Web Audio indisponível (ex.: navegador muito antigo) — ignora.
  }
}

// Cache de <audio> por nome + flag de "esse arquivo não existe/falhou".
const audioCache = {};
const fileMissing = {};

function getAudioEl(name) {
  if (audioCache[name]) return audioCache[name];
  const el = new Audio(SOUND_FILES[name]);
  el.preload = "auto";
  el.addEventListener("error", () => {
    fileMissing[name] = true;
  });
  audioCache[name] = el;
  return el;
}

/**
 * Toca um efeito sonoro pelo nome (ver SOUND_FILES acima).
 * Usa o .mp3 correspondente se ele existir; caso contrário cai
 * automaticamente no beep sintetizado equivalente.
 */
export function playSfx(name, { volume = 0.6, enabled = true } = {}) {
  if (!enabled || volume <= 0) return;
  if (!SOUND_FILES[name]) return;

  if (fileMissing[name]) {
    playSynth(name, volume);
    return;
  }

  try {
    const original = getAudioEl(name);
    if (original.error) {
      fileMissing[name] = true;
      playSynth(name, volume);
      return;
    }
    const instance = original.cloneNode(true);
    instance.volume = Math.min(1, volume);
    const playPromise = instance.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        fileMissing[name] = true;
        playSynth(name, volume);
      });
    }
  } catch {
    playSynth(name, volume);
  }
}
