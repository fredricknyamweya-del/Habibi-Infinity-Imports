import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../../components/layout/AnnouncementBar.jsx';
import FloatingWhatsApp from '../../components/layout/FloatingWhatsApp.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Navbar from '../../components/layout/Navbar.jsx';

export default function RootLayout() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-[55vh]"><Outlet /></main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}