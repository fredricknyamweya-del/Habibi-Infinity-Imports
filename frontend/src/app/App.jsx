import { Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import Home from '../pages/Home.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}