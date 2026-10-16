import { NavLink, Link } from 'react-router-dom';
import { Home, Search, Library, Heart, ListMusic, Plus, AudioLines } from 'lucide-react';
import { playlists } from '../data/demo.js';

export const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/library', label: 'Your Library', icon: Library },
  { to: '/liked', label: 'Liked Songs', icon: Heart },
  { to: '/playlists', label: 'Playlists', icon: ListMusic }
];

export function Brand({ suffix }) {
  return (
    <Link to="/" className="flex items-center gap-2 px-3 py-1 text-lg font-semibold">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-black"><AudioLines size={18} /></span>
      SoundWave{suffix && <span className="text-accent text-sm">{suffix}</span>}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-6 border-r border-line bg-surface p-4 md:flex" aria-label="Primary">
      <Brand />
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={18} />{label}
          </NavLink>
        ))}
      </nav>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <p className="px-3 pb-2 text-xs uppercase tracking-wider text-muted">Your Playlists</p>
        {playlists.map((p) => (
          <Link key={p.id} to={`/playlist/${p.id}`} className="nav-link">
            <span className="h-6 w-6 rounded" style={{ background: p.art }} />{p.title}
          </Link>
        ))}
        <button className="nav-link w-full text-accent"><Plus size={16} />Create Playlist</button>
      </div>
    </aside>
  );
}
