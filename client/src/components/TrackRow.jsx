import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext.jsx';
export const fmt = (s = 0) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
export default function TrackRow({ n, track, queue }) {
  const p = usePlayer();
  const active = p.current?.id === track.id;
  return (
    <li className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-raised">
      <span className={`w-5 text-center text-sm ${active ? 'text-accent' : 'text-muted'}`}>{n}</span>
      <button onClick={() => (active ? p.toggle() : p.playQueue(queue, n - 1))} aria-label={`Play ${track.title}`}
        className="relative h-10 w-10 shrink-0 rounded-md" style={{ background: track.art }}>
        <span className="absolute inset-0 grid place-items-center rounded-md bg-black/50 opacity-0 group-hover:opacity-100">
          {active && p.playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </span>
      </button>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm ${active ? 'text-accent' : ''}`}>{track.title}</p>
        <p className="truncate text-xs text-muted">{track.artist}</p>
      </div>
      <span className="text-xs text-muted tabular-nums">{fmt(track.duration)}</span>
    </li>
  );
}
