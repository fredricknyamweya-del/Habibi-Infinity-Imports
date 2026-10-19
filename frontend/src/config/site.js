const kenyaPhone = '+254 117 037 848';
const tanzaniaPhone = '+255 749 057 058';

export const site = {
  name: 'Habibi Imports',
  locations: [
    { city: 'Dar es Salaam', country: 'Tanzania', code: 'TZ' },
    { city: 'Nairobi', country: 'Kenya', code: 'KE' },
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
    facebook: 'https://www.facebook.com/',
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
