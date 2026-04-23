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
  { id: 'n1', year: 2026, make: 'Nissan', model: 'Rogue', trim: 'SV AWD', type: 'new', price: '$34,980', payment: '$419/mo est.', imageAlt: 'Gray 2026 Nissan Rogue SV AWD at O\'Neil Nissan' },
  { id: 'n2', year: 2026, make: 'Nissan', model: 'Sentra', trim: 'SR', type: 'new', price: '$27,490', payment: '$339/mo est.', imageAlt: 'Blue 2026 Nissan Sentra SR at O\'Neil Nissan' },
  { id: 'u1', year: 2023, make: 'Nissan', model: 'Altima', trim: 'SL', type: 'used', price: '$23,995', payment: '$369/mo est.', mileage: '18,204 mi', imageAlt: 'Black 2023 Nissan Altima SL used at O\'Neil Nissan' },
  { id: 'u2', year: 2022, make: 'Nissan', model: 'Frontier', trim: 'PRO-4X', type: 'used', price: '$34,250', payment: '$498/mo est.', mileage: '25,883 mi', imageAlt: 'White 2022 Nissan Frontier PRO-4X used at O\'Neil Nissan' }
];

export const modelSeo = [
  { slug: 'rogue', name: 'Nissan Rogue' },
  { slug: 'sentra', name: 'Nissan Sentra' },
  { slug: 'altima', name: 'Nissan Altima' },
  { slug: 'pathfinder', name: 'Nissan Pathfinder' },
  { slug: 'frontier', name: 'Nissan Frontier' },
  { slug: 'ariya', name: 'Nissan Ariya' },
];
