import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../../config/site.js';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function Seo() {
  const { pathname } = useLocation();
  const { country } = useCountry();
  useEffect(() => {
    const section = pathname === '/' ? localizedCopy(country, 'Imported Quality, Delivered Across East Africa', 'Bidhaa Bora, Zinaletwa Afrika Mashariki')
      : pathname.startsWith('/category/') ? localizedCopy(country, 'Shop the Collection', 'Nunua kwenye Mkusanyiko')
        : pathname.startsWith('/product/') ? localizedCopy(country, 'Discover a Curated Find', 'Gundua Bidhaa Maalum')
          : pathname.startsWith('/order/success/') ? localizedCopy(country, 'Order Confirmation', 'Uthibitisho wa Oda')
            : pathname.slice(1).replaceAll('/', ' · ').replaceAll('-', ' ') || localizedCopy(country, 'Shop', 'Duka');
    document.title = `${section} | ${site.name}`;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = localizedCopy(country, 'Discover quality fashion, beauty, accessories and technology, delivered across Kenya and Tanzania by Habibi Infinity Imports.', 'Gundua mitindo, bidhaa za urembo, mapambo na teknolojia bora zinazoletwa kote Kenya na Tanzania na Habibi Infinity Imports.');
  }, [country, pathname]);
  return null;
}
