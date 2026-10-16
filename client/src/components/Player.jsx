import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Heart, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext.jsx';
import { fmt } from './TrackRow.jsx';

const Btn = ({ on, children, ...r }) => (
  <button {...r} className={`rounded-full p-2 transition hover:text-white ${on ? 'text-accent' : 'text-muted'}`}>{children}</button>
);

export default function Player() {
  const p = usePlayer(); const t = p.current;
  const Rep = p.repeat === 'one' ? Repeat1 : Repeat;
  return (
    <div className="border-t border-line bg-surface/95 px-3 py-2 backdrop-blur md:px-6" role="region" aria-label="Music player">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_2fr_1fr]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-md bg-raised" style={t ? { background: t.art } : undefined} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{t ? t.title : 'Nothing playing'}</p>
            <p className={`truncate text-xs ${p.error ? 'text-amber-400' : 'text-muted'}`} role={p.error ? 'alert' : undefined}>
              {p.error || t?.artist || 'Pick a track to start'}
            </p>
          </div>
          {t && <Btn on={p.liked.has(t.id)} aria-label="Like" aria-pressed={p.liked.has(t.id)} onClick={() => p.toggleLike(t.id)}>
            <Heart size={16} fill={p.liked.has(t.id) ? 'currentColor' : 'none'} /></Btn>}
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <Btn className="max-md:hidden" on={p.shuffle} aria-label="Shuffle" onClick={p.toggleShuffle}><Shuffle size={16} /></Btn>
            <Btn aria-label="Previous" onClick={p.prev} disabled={!t}><SkipBack size={18} /></Btn>
            <button aria-label={p.playing ? 'Pause' : 'Play'} onClick={p.toggle} disabled={!t}
              className="grid h-10 w-10 place-items-center rounded-full bg-accent text-black disabled:opacity-40">
              {p.loading ? <Loader2 size={18} className="animate-spin" /> : p.playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            <Btn aria-label="Next" onClick={p.next} disabled={!t}><SkipForward size={18} /></Btn>
            <Btn className="max-md:hidden" on={p.repeat !== 'off'} aria-label={`Repeat ${p.repeat}`} onClick={p.cycleRepeat}><Rep size={16} /></Btn>
          </div>
          <div className="hidden w-full items-center gap-2 text-xs text-muted md:flex">
            <span className="w-9 text-right tabular-nums">{fmt(p.time)}</span>
            <input type="range" aria-label="Seek" min={0} max={p.duration || 0} step={1} value={Math.min(p.time, p.duration || 0)}
              disabled={!t || !!p.error} onChange={(e) => p.seek(+e.target.value)} className="h-1 flex-1 accent-[#1ed760]" />
            <span className="w-9 tabular-nums">{fmt(p.duration)}</span>
          </div>
        </div>
        <div className="hidden items-center justify-end gap-2 md:flex">
          <Btn aria-label={p.muted ? 'Unmute' : 'Mute'} onClick={p.toggleMute}>{p.muted || p.volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}</Btn>
          <input type="range" aria-label="Volume" min={0} max={1} step={0.01} value={p.muted ? 0 : p.volume}
            onChange={(e) => p.setVolume(+e.target.value)} className="h-1 w-24 accent-[#1ed760]" />
        </div>
      </div>
    </div>
  );
}
