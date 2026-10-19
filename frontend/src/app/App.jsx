import { Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<div className="page-shell py-24 text-center"><h1 className="font-heading text-4xl text-gold">Habibi Imports</h1><p className="mt-3 text-muted">A more beautiful way to discover imported essentials.</p></div>} />
      </Route>
    </Routes>
  );
}