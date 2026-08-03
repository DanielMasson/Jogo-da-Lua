/**
 * Sons curtos gerados na hora com a Web Audio API — sem arquivos de áudio
 * externos para baixar. O AudioContext só é criado/retomado dentro de um
 * gesto do usuário (clique em Girar/Resposta), respeitando as políticas de
 * autoplay dos navegadores.
 */
let ctx = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    ctx = new AudioContextClass();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tocarTom({ frequencia, duracao = 0.09, tipo = "sine", volume = 0.15, atraso = 0 }) {
  const audioCtx = getCtx();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const ganho = audioCtx.createGain();
  osc.type = tipo;
  osc.frequency.value = frequencia;

  const inicio = audioCtx.currentTime + atraso;
  ganho.gain.setValueAtTime(volume, inicio);
  ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);

  osc.connect(ganho);
  ganho.connect(audioCtx.destination);
  osc.start(inicio);
  osc.stop(inicio + duracao);
}

/** Tique curto tocado a cada "passo" da roleta girando. */
export function tocarTiqueRoleta() {
  tocarTom({ frequencia: 720, duracao: 0.045, tipo: "square", volume: 0.07 });
}

/** Pequeno arpejo ascendente tocado quando a resposta revelada é acerto. */
export function tocarAcerto() {
  tocarTom({ frequencia: 660, duracao: 0.11, tipo: "triangle", volume: 0.16 });
  tocarTom({ frequencia: 880, duracao: 0.14, tipo: "triangle", volume: 0.16, atraso: 0.09 });
  tocarTom({ frequencia: 1320, duracao: 0.18, tipo: "triangle", volume: 0.14, atraso: 0.18 });
}

/** Buzina curta e grave, descendente, tocada quando a resposta revelada é erro. */
export function tocarErro() {
  tocarTom({ frequencia: 220, duracao: 0.16, tipo: "sawtooth", volume: 0.14 });
  tocarTom({ frequencia: 155, duracao: 0.24, tipo: "sawtooth", volume: 0.13, atraso: 0.11 });
}
