// Default sweet images for the application
export const defaultSweetImages = {
  // Traditional Indian Sweets
  ariselu: '/images/Ariselu.png',
  bobbatlu: '/images/Bobbatlu (Puran Poli).png',
  chhenaGaja: '/images/Chhena Gaja.png',
  chhenaPoda: '/images/Chhena Poda.png',
  keriNoRas: '/images/Keri no Ras (Mango Pulp Dessert).png',
  ledikeni: '/images/Ledikeni.png',
  mysorePak: '/images/Mysore Pak.png',
  payasam: '/images/Payasam (Kheer).png',
  ravaKesari: '/images/Rava Kesari.png',
  sandesh: '/images/Sandesh.png',
  balushahi: '/images/balushahi.png',
  barfi: '/images/berfi.png',
  gajarKaHalwa: '/images/gajer ka halwa.png',
  gulabJamun: '/images/gulab.png',
  imarti: '/images/imerti.png',
  jalebi: '/images/jalebi.png',
  modak: '/images/modak.png',
  rasgulla: '/images/rasgulla.png',
  rasmalai: '/images/rasmalai.png',
  sonpari: '/images/sonpari.png',
  giftbox: '/images/gitbox.png',
  default: '/images/default-sweet.jpg'
};

// Function to get appropriate image based on sweet name
export const getSweetImage = (sweetName: string): string => {
  const name = sweetName.toLowerCase();
  
  // Check for each sweet type with various name variations
  if (name.includes('ariselu')) return defaultSweetImages.ariselu;
  if (name.includes('bobbatlu') || name.includes('puran poli')) return defaultSweetImages.bobbatlu;
  if (name.includes('chhena gaja')) return defaultSweetImages.chhenaGaja;
  if (name.includes('chhena poda')) return defaultSweetImages.chhenaPoda;
  if (name.includes('keri') || name.includes('mango')) return defaultSweetImages.keriNoRas;
  if (name.includes('ledikeni')) return defaultSweetImages.ledikeni;
  if (name.includes('mysore pak')) return defaultSweetImages.mysorePak;
  if (name.includes('payasam') || name.includes('kheer')) return defaultSweetImages.payasam;
  if (name.includes('rava kesari')) return defaultSweetImages.ravaKesari;
  if (name.includes('sandesh')) return defaultSweetImages.sandesh;
  if (name.includes('balushahi')) return defaultSweetImages.balushahi;
  if (name.includes('barfi') || name.includes('burfi')) return defaultSweetImages.barfi;
  if (name.includes('gajar') || name.includes('halwa')) return defaultSweetImages.gajarKaHalwa;
  if (name.includes('gulab') || name.includes('jamun')) return defaultSweetImages.gulabJamun;
  if (name.includes('imarti') || name.includes('imerti')) return defaultSweetImages.imarti;
  if (name.includes('jalebi') || name.includes('jilebi')) return defaultSweetImages.jalebi;
  if (name.includes('modak')) return defaultSweetImages.modak;
  if (name.includes('rasgulla') || name.includes('rasagola')) return defaultSweetImages.rasgulla;
  if (name.includes('rasmalai') || name.includes('ras malai')) return defaultSweetImages.rasmalai;
  if (name.includes('sonpari')) return defaultSweetImages.sonpari;
  
  return defaultSweetImages.default;
};
