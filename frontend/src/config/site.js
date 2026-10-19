const kenyaPhone = '+254 117 037 848';
const tanzaniaPhone = '+255 749 057 058';

export const site = {
  name: 'Habibi Infinity Imports',
  locations: [
    { city: 'Mombasa/Nairobi', country: 'Kenya', code: 'KE' },
    { city: 'Dar es Salaam', country: 'Tanzania', code: 'TZ' },
  ],
  pickupPoints: [
    { name: 'Nairobi Shop', country: 'Kenya' },
    { name: 'Mombasa Shop', country: 'Kenya' },
    { name: 'Dar es Salaam Shop', country: 'Tanzania' },
  ],
  contacts: {
    TZ: {
      phone: tanzaniaPhone,
      whatsapp: `https://wa.me/${tanzaniaPhone.replace(/\D/g, '')}`,
    },
    KE: {
      // TODO: Verify the Kenya number length.
      phone: kenyaPhone,
      whatsapp: `https://wa.me/${kenyaPhone.replace(/\D/g, '')}`,
    },
  },
  socials: {
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
    facebook: 'https://www.facebook.com/',
    email: 'your-email@example.com',
  },
  links: {
    delivery: '/delivery',
    returns: '/returns',
  },
};

export const categories = [
  { number: '01', name: 'Fashion & Apparel', slug: 'fashion-apparel', subcategories: ["Women's", "Men's", 'Designer', 'Bridal', 'Baby'] },
  { number: '02', name: 'Bags & Handbags', slug: 'bags-handbags', subcategories: ['Handbags', 'Travel', 'Backpacks'] },
  { number: '03', name: 'Beauty & Fragrance', slug: 'beauty-fragrance', subcategories: ['Perfumes', 'Cosmetics', 'Skincare'] },
  { number: '04', name: 'Jewelry & Accessories', slug: 'jewelry-accessories', subcategories: ['Jewelry', 'Watches', 'Fashion Accessories'] },
  { number: '05', name: 'Footwear', slug: 'footwear', subcategories: ['Women', 'Men', 'Children'] },
  { number: '06', name: 'Phones & Mobile Accessories', slug: 'phones-mobile', subcategories: ['Phones', 'Cases', 'Chargers', 'Audio'] },
  { number: '07', name: 'Electronics & Gadgets', slug: 'electronics-gadgets', subcategories: ['Smart devices', 'Audio', 'Tech accessories'] },
];
