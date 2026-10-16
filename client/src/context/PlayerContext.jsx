import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
const Ctx = createContext(null);
export const usePlayer = () => useContext(Ctx);

export function PlayerProvider({ children }) {
  const audio = useRef(null); // single shared Audio instance
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVol] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off'); // off | all | one
  const [liked, setLiked] = useState(() => new Set());
  const current = queue[index] ?? null;

  const load = useCallback((track) => {
    const a = audio.current;
    setTime(0); setError(null);
    if (!track.audioUrl) { // never fake playback
      a.removeAttribute('src'); a.load(); setPlaying(false); setLoading(false);
      setError('Audio unavailable for this track (demo data has no source).'); return;
    }
    setLoading(true); a.src = track.audioUrl;
    a.play().catch((e) => { setPlaying(false); setLoading(false); setError(e.message || 'Playback failed'); });
  }, []);

  const go = useCallback((i, q) => {
    const list = q ?? queue; if (!list.length) return;
    const n = ((i % list.length) + list.length) % list.length;
    if (q) setQueue(q); setIndex(n); load(list[n]);
  }, [queue, load]);

  const next = useCallback((auto = false) => {
    if (!queue.length) return;
    if (auto && repeat === 'one') return go(index);
    if (shuffle && queue.length > 1) { let r; do r = Math.floor(Math.random() * queue.length); while (r === index); return go(r); }
    if (auto && repeat === 'off' && index === queue.length - 1) return setPlaying(false);
    go(index + 1);
  }, [queue, index, repeat, shuffle, go]);

  const seek = (t) => { audio.current.currentTime = t; setTime(t); };
  const prev = () => (time > 3 ? seek(0) : go(index - 1));
  const toggle = () => {
    const a = audio.current; if (!current) return;
    if (error || !a.src) return load(current);
    a.paused ? a.play().catch((e) => setError(e.message)) : a.pause();
  };
  const setVolume = (v) => { setVol(v); setMuted(v === 0); };
  const toggleLike = (id) => setLiked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }); // local until Phase 6 API

  useEffect(() => {
    const a = (audio.current = new Audio()); a.preload = 'metadata';
    const on = {
      play: () => setPlaying(true), pause: () => setPlaying(false),
      playing: () => setLoading(false), waiting: () => setLoading(true),
      timeupdate: () => setTime(a.currentTime),
      loadedmetadata: () => setDuration(a.duration || 0),
      error: () => { if (a.getAttribute('src')) { setLoading(false); setPlaying(false); setError('Could not load this audio file.'); } }
    };
    Object.entries(on).forEach(([k, f]) => a.addEventListener(k, f));
    return () => { Object.entries(on).forEach(([k, f]) => a.removeEventListener(k, f)); a.pause(); };
  }, []);
  useEffect(() => { const a = audio.current; if (a) { a.volume = volume; a.muted = muted; } }, [volume, muted]);
  useEffect(() => { const a = audio.current; const h = () => next(true); a.addEventListener('ended', h); return () => a.removeEventListener('ended', h); }, [next]);

  const value = {
    queue, current, playing, loading, error, time, duration: duration || current?.duration || 0,
    volume, muted, shuffle, repeat, liked,
    playQueue: (t, i = 0) => go(i, t), toggle, next: () => next(false), prev, seek, setVolume,
    toggleMute: () => setMuted((m) => !m), toggleShuffle: () => setShuffle((s) => !s),
    cycleRepeat: () => setRepeat((r) => ({ off: 'all', all: 'one', one: 'off' }[r])), toggleLike
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
