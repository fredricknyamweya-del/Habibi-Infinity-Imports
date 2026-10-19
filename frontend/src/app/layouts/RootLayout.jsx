import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../../components/layout/AnnouncementBar.jsx';
import FloatingWhatsApp from '../../components/layout/FloatingWhatsApp.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Navbar from '../../components/layout/Navbar.jsx';
import PromoPopup from '../../components/ads/PromoPopup.jsx';
import ScrollToTop from '../../components/layout/ScrollToTop.jsx';
import Seo from '../../components/ui/Seo.jsx';

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Seo />
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-[55vh]"><Outlet /></main>
      <Footer />
      <FloatingWhatsApp />
      <PromoPopup />
    </>
  );
}