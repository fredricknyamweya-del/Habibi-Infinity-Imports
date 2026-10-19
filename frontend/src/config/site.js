const kenyaPhone = '+25411037848';

export const site = {
  name: 'Habibi Imports',
  locations: [
    { city: 'Dar es Salaam', country: 'Tanzania', code: 'TZ' },
    { city: 'Nairobi', country: 'Kenya', code: 'KE' },
  ],
  contacts: {
    TZ: {
      phone: '+255 749057058',
      whatsapp: 'https://wa.me/255749057058',
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
