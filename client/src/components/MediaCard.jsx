import { Play } from 'lucide-react';
export default function MediaCard({ title, sub, art, onPlay, round = false }) {
  return (
    <div className="group card p-3 transition hover:bg-raised">
      <div className="relative">
        <div className={`aspect-square w-full ${round ? 'rounded-full' : 'rounded-lg'}`} style={{ background: art }} />
        {onPlay && (
          <button onClick={onPlay} aria-label={`Play ${title}`}
            className="absolute bottom-2 right-2 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-accent text-black opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100 focus-visible:opacity-100 max-md:translate-y-0 max-md:opacity-100">
            <Play size={18} fill="currentColor" />
          </button>
        )}
      </div>
      <p className="mt-3 truncate text-sm font-medium">{title}</p>
      <p className="truncate text-xs text-muted">{sub}</p>
    </div>
  );
}
