import { Search, Bell } from 'lucide-react';
export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 bg-bg/80 px-4 py-3 backdrop-blur md:px-8">
      <label className="relative max-w-md flex-1">
        <span className="sr-only">Search songs, artists, albums</span>
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input placeholder="Search songs, artists, albums…" className="w-full rounded-full border border-line bg-surface py-2 pl-9 pr-4 text-sm placeholder:text-muted" />
      </label>
      <button aria-label="Notifications" className="ml-auto rounded-full p-2 text-muted hover:text-white"><Bell size={18} /></button>
      <button className="flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-sm">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-black">A</span>
        <span className="hidden sm:inline">Alex Carter</span>
      </button>
    </header>
  );
}
