import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../../config/site.js';

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const section = pathname === '/' ? 'Imported Quality, Delivered Across East Africa'
      : pathname.startsWith('/category/') ? 'Shop the Collection'
        : pathname.startsWith('/product/') ? 'Discover a Curated Find'
          : pathname.startsWith('/order/success/') ? 'Order Confirmation'
            : pathname.slice(1).replaceAll('/', ' · ').replaceAll('-', ' ') || 'Shop';
    document.title = `${section} | ${site.name}`;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = 'Discover quality fashion, beauty, accessories and technology, delivered across Kenya and Tanzania by Habibi Infinity Imports.';
  }, [pathname]);
  return null;
}
