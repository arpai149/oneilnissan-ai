export type InventoryItem = {
  id: string;
  model: 'Rogue' | 'Sentra' | 'Murano';
  trim: string;
  price: string;
  ctaLabel: string;
};

export const inventoryByModel: Record<InventoryItem['model'], InventoryItem[]> = {
  Rogue: [
    { id: 'rogue-sv-fwd', model: 'Rogue', trim: 'SV FWD', price: '$33,240', ctaLabel: 'Check Availability' },
    { id: 'rogue-sv-awd', model: 'Rogue', trim: 'SV AWD', price: '$33,980', ctaLabel: 'Check Availability' },
    { id: 'rogue-dark-armor-fwd', model: 'Rogue', trim: 'Dark Armor FWD', price: '$35,120', ctaLabel: 'Check Availability' },
    { id: 'rogue-dark-armor-awd', model: 'Rogue', trim: 'Dark Armor AWD', price: '$35,890', ctaLabel: 'Check Availability' },
    { id: 'rogue-platinum-fwd', model: 'Rogue', trim: 'Platinum FWD', price: '$45,110', ctaLabel: 'Check Availability' },
    { id: 'rogue-platinum-awd', model: 'Rogue', trim: 'Platinum AWD', price: '$45,860', ctaLabel: 'Check Availability' },
  ],
  Sentra: [
    { id: 'sentra-s', model: 'Sentra', trim: 'S', price: '$22,990', ctaLabel: 'Check Availability' },
    { id: 'sentra-sv', model: 'Sentra', trim: 'SV', price: '$24,640', ctaLabel: 'Check Availability' },
    { id: 'sentra-sr', model: 'Sentra', trim: 'SR Premium', price: '$27,480', ctaLabel: 'Check Availability' },
  ],
  Murano: [
    { id: 'murano-sv', model: 'Murano', trim: 'SV AWD', price: '$39,850', ctaLabel: 'Check Availability' },
    { id: 'murano-sl', model: 'Murano', trim: 'SL AWD', price: '$44,320', ctaLabel: 'Check Availability' },
    { id: 'murano-platinum', model: 'Murano', trim: 'Platinum AWD', price: '$48,990', ctaLabel: 'Check Availability' },
  ],
};

export const vehicles: InventoryItem[] = Object.values(inventoryByModel).flat();

export const modelSeo = [
  { slug: 'rogue', name: 'Nissan Rogue' },
  { slug: 'sentra', name: 'Nissan Sentra' },
  { slug: 'altima', name: 'Nissan Altima' },
  { slug: 'pathfinder', name: 'Nissan Pathfinder' },
  { slug: 'frontier', name: 'Nissan Frontier' },
  { slug: 'ariya', name: 'Nissan Ariya' },
];
