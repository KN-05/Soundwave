import MediaCard from '../components/MediaCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import TrackRow from '../components/TrackRow.jsx';
import { tracks, playlists, DEMO } from '../data/demo.js';
import { usePlayer } from '../context/PlayerContext.jsx';

const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

export default function Home() {
  const { playQueue } = usePlayer();
  return (
    <>
      <h1 className="pt-4 text-3xl font-bold">{greet()}, Alex</h1>
      <p className="text-sm text-muted">Here's what's playing today{DEMO && ' · demo data'}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {playlists.map((p) => (
          <MediaCard key={p.id} title={p.title} sub={p.sub} art={p.art} onPlay={() => playQueue(tracks, 0)} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section>
          <SectionHeader title="Recently Played" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {tracks.slice(0, 4).map((t, i) => (
              <MediaCard key={t.id} title={t.title} sub={t.artist} art={t.art} onPlay={() => playQueue(tracks, i)} />
            ))}
          </div>
        </section>
        <section>
          <SectionHeader title="Trending Now" />
          <ul className="card p-2">{tracks.map((t, i) => <TrackRow key={t.id} n={i + 1} track={t} queue={tracks} />)}</ul>
        </section>
      </div>
    </>
  );
}
