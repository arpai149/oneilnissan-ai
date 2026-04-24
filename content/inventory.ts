export type Vehicle = {
  id: string;
  year: number;
  make: 'Nissan';
  model: string;
  trim: string;
  type: 'new' | 'used';
  price: string;
  payment: string;
  mileage?: string;
  imageAlt: string;
};

export const vehicles: Vehicle[] = [
  { id: 'n1', year: 2026, make: 'Nissan', model: 'Rogue', trim: 'SV AWD', type: 'new', price: 'From the low $30Ks', payment: '', imageAlt: '2026 Nissan Rogue SV AWD at O\'Neil Nissan' },
  { id: 'n2', year: 2026, make: 'Nissan', model: 'Rogue', trim: 'Dark Armor', type: 'new', price: 'Offer-ready SUV', payment: '', imageAlt: '2026 Nissan Rogue Dark Armor at O\'Neil Nissan' },
  { id: 'n3', year: 2026, make: 'Nissan', model: 'Murano', trim: '', type: 'new', price: 'Premium comfort, strong April support', payment: '', imageAlt: '2026 Nissan Murano at O\'Neil Nissan' },
  { id: 'n4', year: 2026, make: 'Nissan', model: 'Pathfinder', trim: '', type: 'new', price: 'Family SUV offer opportunity', payment: '', imageAlt: '2026 Nissan Pathfinder at O\'Neil Nissan' },
  { id: 'n5', year: 2026, make: 'Nissan', model: 'Sentra', trim: 'SV', type: 'new', price: 'Efficient sedan value', payment: '', imageAlt: '2026 Nissan Sentra SV at O\'Neil Nissan' },
  { id: 'n6', year: 2026, make: 'Nissan', model: 'Frontier', trim: 'SV / PRO-4X', type: 'new', price: 'Truck offer opportunity', payment: '', imageAlt: '2026 Nissan Frontier SV and PRO-4X at O\'Neil Nissan' }
];

export const modelSeo = [
  { slug: 'rogue', name: 'Nissan Rogue' },
  { slug: 'sentra', name: 'Nissan Sentra' },
  { slug: 'altima', name: 'Nissan Altima' },
  { slug: 'pathfinder', name: 'Nissan Pathfinder' },
  { slug: 'frontier', name: 'Nissan Frontier' },
  { slug: 'ariya', name: 'Nissan Ariya' },
];
