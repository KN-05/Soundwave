import { Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout.jsx';
import Home from './pages/Home.jsx';
export default function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        {/* Phase 2: search, library, playlist, artist, album, profile. Phase 3: /admin layout. */}
      </Route>
    </Routes>
  );
}
