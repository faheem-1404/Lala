/**
 * Procedural, user-controlled sound design (no autoplay, no external files).
 * - ambience: filtered brown noise with a slow breathing LFO (kitchen hush / milk steam)
 * - splash:   short filtered-noise burst with a pitch dip (used once when the milk explodes)
 * - tick:     tiny sine blip for interaction feedback
 */
class LalaAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambience: { src: AudioBufferSourceNode; gain: GainNode } | null = null;
  enabled = false;

  private ensure() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.0;
    this.master.connect(this.ctx.destination);
    return this.ctx;
  }

  private brownNoise(ctx: AudioContext, seconds = 4) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    return buf;
  }

  async enable() {
    const ctx = this.ensure();
    if (ctx.state === "suspended") await ctx.resume();
    this.enabled = true;
    if (!this.ambience) {
      const src = ctx.createBufferSource();
      src.buffer = this.brownNoise(ctx, 6);
      src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 420;
      lp.Q.value = 0.4;
      const gain = ctx.createGain();
      gain.gain.value = 0.35;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 120;
      lfo.connect(lfoGain).connect(lp.frequency);
      lfo.start();
      src.connect(lp).connect(gain).connect(this.master!);
      src.start();
      this.ambience = { src, gain };
    }
    this.master!.gain.cancelScheduledValues(ctx.currentTime);
    this.master!.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2);
  }

  disable() {
    if (!this.ctx || !this.master) return;
    this.enabled = false;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);
  }

  toggle() {
    return this.enabled ? (this.disable(), false) : (void this.enable(), true);
  }

  tick() {
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.05);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(ctx.currentTime + 0.14);
  }

  splash() {
    if (!this.enabled || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.brownNoise(ctx, 1);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(1800, ctx.currentTime);
    bp.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5);
    bp.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);
    src.connect(bp).connect(g).connect(this.master);
    src.start();
    src.stop(ctx.currentTime + 0.8);
  }
}

export const lalaAudio = typeof window !== "undefined" ? new LalaAudio() : (null as unknown as LalaAudio);
