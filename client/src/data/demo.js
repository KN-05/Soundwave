// DEMO DATA — replaced by API data in Phase 8. No audio is bundled, so playback
// reports "unavailable" until real R2 URLs exist (Phases 6–7).
const g = (a, b) => `linear-gradient(135deg, ${a}, ${b})`;
export const DEMO = true;
export const tracks = [
  { id: 't1', title: 'Midnight Drive', artist: 'The Horizon', art: g('#7c3aed', '#f97316'), duration: 204, audioUrl: null },
  { id: 't2', title: 'Better Days', artist: 'Luna Rivers', art: g('#0f766e', '#a3e635'), duration: 226, audioUrl: null },
  { id: 't3', title: 'Ocean Eyes', artist: 'Blue Harbor', art: g('#0369a1', '#22d3ee'), duration: 192, audioUrl: null },
  { id: 't4', title: 'Lost in Time', artist: 'The Wanderers', art: g('#475569', '#fda4af'), duration: 261, audioUrl: null },
  { id: 't5', title: 'Golden Hour', artist: 'Solara', art: g('#b45309', '#fcd34d'), duration: 178, audioUrl: null }
];
export const playlists = [
  { id: 'p1', title: 'Chill Vibes', sub: 'Playlist • 50 songs', art: g('#a855f7', '#ec4899') },
  { id: 'p2', title: 'Focus Beats', sub: 'Playlist • 42 songs', art: g('#1d4ed8', '#38bdf8') },
  { id: 'p3', title: 'Workout Mix', sub: 'Playlist • 58 songs', art: g('#15803d', '#facc15') },
  { id: 'p4', title: 'Road Trip', sub: 'Playlist • 37 songs', art: g('#be123c', '#fb923c') }
];
