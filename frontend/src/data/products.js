import { categories } from '../config/site.js';

const catalog = [
  ['Silk Evening Dress', 18400, 'fashion-apparel', "Women's", 4.8],
  ['Linen Tailored Set', 12600, 'fashion-apparel', "Women's", 4.7],
  ['Classic Oxford Shirt', 7900, 'fashion-apparel', "Men's", 4.6],
  ['Leather Weekender', 21900, 'bags-handbags', 'Travel', 4.9],
  ['Mini Top Handle Bag', 14800, 'bags-handbags', 'Handbags', 4.8],
  ['Everyday Leather Tote', 16500, 'bags-handbags', 'Handbags', 4.7],
  ['Amber Oud Eau de Parfum', 9800, 'beauty-fragrance', 'Perfumes', 4.9],
  ['Radiance Skincare Set', 7400, 'beauty-fragrance', 'Skincare', 4.6],
  ['Velvet Lip Collection', 5200, 'beauty-fragrance', 'Cosmetics', 4.5],
  ['Sculpted Gold Hoops', 6800, 'jewelry-accessories', 'Jewelry', 4.8],
  ['Heritage Automatic Watch', 28700, 'jewelry-accessories', 'Watches', 4.9],
  ['Pearl Pendant Necklace', 8900, 'jewelry-accessories', 'Jewelry', 4.7],
  ['Sculpted Leather Heels', 15900, 'footwear', 'Women', 4.6],
  ['City Runner Sneakers', 11200, 'footwear', 'Men', 4.7],
  ['Mini Classic Trainers', 7600, 'footwear', 'Children', 4.6],
  ['Aura Smartphone Pro', 98200, 'phones-mobile', 'Phones', 4.8],
  ['MagSafe Leather Case', 5200, 'phones-mobile', 'Cases', 4.5],
  ['Wireless Fast Charger', 6400, 'phones-mobile', 'Chargers', 4.6],
  ['Studio Wireless Headphones', 22500, 'phones-mobile', 'Audio', 4.8],
  ['Smart Home Speaker', 19800, 'electronics-gadgets', 'Audio', 4.7],
  ['Everyday Smart Watch', 17300, 'electronics-gadgets', 'Smart devices', 4.6],
  ['Portable Projector Mini', 32400, 'electronics-gadgets', 'Tech accessories', 4.7],
  ['Travel Power Adapter', 3900, 'electronics-gadgets', 'Tech accessories', 4.5],
  ['Noise Cancelling Earbuds', 14500, 'electronics-gadgets', 'Audio', 4.8],
];

export const mockProducts = catalog.map(([name, price, category, subcategory, rating], index) => {
  const categoryInfo = categories.find((item) => item.slug === category);
  return {
    id: `HII-${String(index + 1).padStart(4, '0')}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category,
    categoryName: categoryInfo.name,
    subcategory,
    description: `${name}, thoughtfully sourced for a refined everyday. Designed to feel considered, last beautifully, and arrive ready to enjoy.`,
    descriptionSwahili: `${name}, imechaguliwa kwa umakini ili kukupa ubora na mtindo unaofaa kwa matumizi ya kila siku.`,
    image: `https://images.unsplash.com/photo-${[
      '1483985988355-763728e1935b', '1490481651871-ab68de25d43d', '1521572163474-6864f9cf17ab',
      '1548036328-c9fa89d128fa', '1584917865442-de89df76afd3', '1590874103328-eac38a683ce7',
      '1541643600914-78b084683601', '1608248543803-ba4f8c70ae0b', '1596462502278-27bfdc403348',
      '1611652022419-a9419f74343d', '1523275335684-37898b6baf30', '1617038220319-276d3cfab638',
      '1543163521-1bf539c55dd2', '1542291026-7eec264c27ff', '1514989940723-e8e51635b782',
      '1592899677977-9c10ca588bbd', '1601593346740-925612772716', '1605236453806-6ff36851218e',
      '1505740420928-5e560c06d30e', '1608043152269-423dbba4e7e1', '1523275335684-37898b6baf30',
      '1622979135225-d2ba269cf1ac', '1558618666-fcd25c85cd64', '1590658268037-6bf12165a8df',
    ][index]}?auto=format&fit=crop&w=900&q=85`,
    price: { KE: price, TZ: Math.round(price * 40) },
    rating,
    reviewCount: 18 + ((index * 13) % 170),
    stock: 3 + ((index * 7) % 24),
    variants: index % 3 === 0 ? ['S', 'M', 'L'] : index % 3 === 1 ? ['Black', 'Ivory', 'Tan'] : ['One size'],
    badges: index % 5 === 0 ? ['New'] : index % 4 === 0 ? ['Sale'] : [],
    isNew: index < 8,
    isDeal: index % 6 === 0,
  };
});

export const mockCategories = categories;
