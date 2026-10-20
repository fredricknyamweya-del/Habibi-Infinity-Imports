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

export function localizedSubcategoryName(country, name) {
  return country === 'TZ' ? subcategoryNames[name] || name : name;
}

export function localizedStatus(country, status) {
  return country === 'TZ' ? statusLabels[status] || status : status;
}
