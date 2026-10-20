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

export function localizedStatus(country, status) {
  return country === 'TZ' ? statusLabels[status] || status : status;
}
