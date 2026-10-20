export function localizedCopy(country, english, swahili) {
  return country === 'TZ' ? swahili : english;
}

const categoryNames = {
  'Fashion & Apparel': 'Mitindo na Mavazi',
  'Bags & Handbags': 'Mifuko na Mikoba',
  'Beauty & Fragrance': 'Urembo na Manukato',
  'Jewelry & Accessories': 'Vito na Mapambo',
  Footwear: 'Viatu',
  'Phones & Mobile Accessories': 'Simu na Vifaa vya Simu',
  'Electronics & Gadgets': 'Elektroniki na Vifaa vya Kisasa',
};

const productNames = {
  'Silk Evening Dress': 'Gauni la Jioni la Hariri',
  'Linen Tailored Set': 'Seti ya Kitani Iliyoshonwa',
  'Classic Oxford Shirt': 'Shati la Oxford la Kawaida',
  'Leather Weekender': 'Begi la Safari la Ngozi',
  'Mini Top Handle Bag': 'Mkoba Mdogo wa Kushika Mkono',
  'Everyday Leather Tote': 'Mkoba wa Ngozi wa Kila Siku',
  'Amber Oud Eau de Parfum': 'Manukato ya Amber Oud',
  'Radiance Skincare Set': 'Seti ya Utunzaji wa Ngozi ya Mng’ao',
  'Velvet Lip Collection': 'Mkusanyiko wa Lipstick za Velvet',
  'Sculpted Gold Hoops': 'Pete za Duara za Dhahabu',
  'Heritage Automatic Watch': 'Saa ya Heritage Inayojifunga Yenyewe',
  'Pearl Pendant Necklace': 'Mkufu wa Lulu wa Kuning’inia',
  'Sculpted Leather Heels': 'Viatu vya Kisigino vya Ngozi',
  'City Runner Sneakers': 'Viatu vya Mazoezi vya Mjini',
  'Mini Classic Trainers': 'Viatu Vidogo vya Michezo vya Kawaida',
  'Aura Smartphone Pro': 'Simu Janja ya Aura Pro',
  'MagSafe Leather Case': 'Kava la Ngozi la MagSafe',
  'Wireless Fast Charger': 'Chaja ya Haraka Isiyotumia Waya',
  'Studio Wireless Headphones': 'Vipokea Sauti vya Studio Visivyotumia Waya',
  'Smart Home Speaker': 'Spika Janja ya Nyumbani',
  'Everyday Smart Watch': 'Saa Janja ya Kila Siku',
  'Portable Projector Mini': 'Projekta Ndogo Inayobebeka',
  'Travel Power Adapter': 'Adapta ya Umeme ya Safari',
  'Noise Cancelling Earbuds': 'Vipokea Sauti Vidogo Vinavyopunguza Kelele',
};

const subcategoryNames = {
  "Women's": 'Wanawake',
  "Men's": 'Wanaume',
  Designer: 'Miundo ya wabunifu',
  Bridal: 'Mavazi ya harusi',
  Baby: 'Watoto wachanga',
  Handbags: 'Mikoba',
  Travel: 'Safari',
  Backpacks: 'Mikoba ya mgongoni',
  Perfumes: 'Manukato',
  Cosmetics: 'Vipodozi',
  Skincare: 'Utunzaji wa ngozi',
  Jewelry: 'Vito',
  Watches: 'Saa',
  'Fashion Accessories': 'Vifaa vya mitindo',
  Women: 'Wanawake',
  Men: 'Wanaume',
  Children: 'Watoto',
  Phones: 'Simu',
  Cases: 'Vifuniko vya simu',
  Chargers: 'Chaja',
  Audio: 'Vifaa vya sauti',
  'Smart devices': 'Vifaa janja',
  'Tech accessories': 'Vifaa vya teknolojia',
};

const variantNames = {
  Black: 'Nyeusi',
  Ivory: 'Nyeupe ya pembe',
  Tan: 'Hudhurungi',
  'One size': 'Saizi moja',
};

const statusLabels = {
  New: 'Mpya',
  Sale: 'Ofa',
  Sponsored: 'Imedhaminiwa',
  Limited: 'Idadi ndogo',
  Popular: 'Maarufu',
};

export function localizedCategoryName(country, name) {
  return country === 'TZ' ? categoryNames[name] || name : name;
}

export function localizedProductName(country, product) {
  const name = typeof product === 'string' ? product : product?.name;
  if (country !== 'TZ' || !name) return name || '';
  return (typeof product === 'object' && product.nameSwahili) || productNames[name] || name;
}

export function localizedSubcategoryName(country, name) {
  return country === 'TZ' ? subcategoryNames[name] || name : name;
}

export function localizedVariantName(country, name) {
  return country === 'TZ' ? variantNames[name] || name : name;
}

export function localizedOrderStatus(country, status) {
  const labels = {
    processing: 'Inashughulikiwa',
    confirmed: 'Imethibitishwa',
    shipped: 'Imesafirishwa',
    delivered: 'Imefikishwa',
  };
  const normalized = String(status || '').toLowerCase().replaceAll('_', ' ');
  return country === 'TZ' ? labels[normalized] || normalized : normalized;
}

export function localizedAdText(country, ad, field) {
  if (country !== 'TZ') return ad[field];
  return ad[`${field}Swahili`] || (field === 'title' ? 'Chaguo maalum' : 'Gundua bidhaa zilizochaguliwa kwa ajili yako.');
}

export function localizedStatus(country, status) {
  return country === 'TZ' ? statusLabels[status] || status : status;
}
