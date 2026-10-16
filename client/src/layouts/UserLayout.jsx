import { NavLink, Outlet } from 'react-router-dom';
import Sidebar, { navItems } from '../components/Sidebar.jsx';
import TopBar from '../components/TopBar.jsx';
import Player from '../components/Player.jsx';

export default function UserLayout() {
  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-y-auto bg-gradient-to-b from-[#0f2a1e] via-bg to-bg bg-[length:100%_320px] bg-no-repeat">
          <TopBar />
          <div className="px-4 pb-8 md:px-8"><Outlet /></div>
        </main>
      </div>
      <Player />
      <nav className="grid grid-cols-5 border-t border-line bg-surface md:hidden" aria-label="Mobile">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex flex-col items-center gap-1 py-2 text-[10px] ${isActive ? 'text-accent' : 'text-muted'}`}>
            <Icon size={18} />{label.replace('Your ', '')}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
