export type InventoryItem = {
  id: string;
  year: number;
  make: 'Nissan';
  model: 'Rogue' | 'Sentra' | 'Murano' | 'Pathfinder' | 'Frontier';
  trim: string;
  type: 'new' | 'used';
  priceLabel: string;
  offerLabel: string;
  priorityReason: string;
  ctaLabel: 'Check Availability';
  modelSlug: string;
  imageAlt: string;
  stockNumber: string;
  availabilityLabel: 'Available now' | 'In stock';
};

const compliantOffer = 'Available on select models for qualified buyers; see dealer for details.';

export const vehicles: InventoryItem[] = [
  {
    id: '26-rogue-sv-awd-1', year: 2026, make: 'Nissan', model: 'Rogue', trim: 'SV AWD', type: 'new',
    priceLabel: '$33,980 MSRP', offerLabel: compliantOffer, priorityReason: 'Top April family SUV demand with strong all-weather utility.',
    ctaLabel: 'Check Availability', modelSlug: 'rogue', imageAlt: '2026 Nissan Rogue SV AWD parked at O\'Neil Nissan', stockNumber: '#26G1234', availabilityLabel: 'Available now'
  },
  {
    id: '26-rogue-dark-armor-1', year: 2026, make: 'Nissan', model: 'Rogue', trim: 'Dark Armor', type: 'new',
    priceLabel: '$35,890 MSRP', offerLabel: compliantOffer, priorityReason: 'High-interest appearance package arriving in limited batches.',
    ctaLabel: 'Check Availability', modelSlug: 'rogue', imageAlt: '2026 Nissan Rogue Dark Armor edition in black', stockNumber: '#26G1288', availabilityLabel: 'In stock'
  },
  {
    id: '26-rogue-platinum-1', year: 2026, make: 'Nissan', model: 'Rogue', trim: 'Platinum AWD', type: 'new',
    priceLabel: '$45,860 MSRP', offerLabel: compliantOffer, priorityReason: 'Premium trim shoppers are booking appointments quickly.',
    ctaLabel: 'Check Availability', modelSlug: 'rogue', imageAlt: '2026 Nissan Rogue Platinum AWD premium trim', stockNumber: '#26G1321', availabilityLabel: 'Available now'
  },
  {
    id: '26-sentra-sv-1', year: 2026, make: 'Nissan', model: 'Sentra', trim: 'SV', type: 'new',
    priceLabel: '$24,640 MSRP', offerLabel: compliantOffer, priorityReason: 'Value-focused commuters continue to prioritize Sentra inventory.',
    ctaLabel: 'Check Availability', modelSlug: 'sentra', imageAlt: '2026 Nissan Sentra SV exterior view', stockNumber: '#26S2042', availabilityLabel: 'In stock'
  },
  {
    id: '26-murano-sl-1', year: 2026, make: 'Nissan', model: 'Murano', trim: 'SL AWD', type: 'new',
    priceLabel: '$44,320 MSRP', offerLabel: compliantOffer, priorityReason: 'Mid-size crossover demand remains strong among upgrade buyers.',
    ctaLabel: 'Check Availability', modelSlug: 'murano', imageAlt: '2026 Nissan Murano SL AWD in metallic gray', stockNumber: '#26M3140', availabilityLabel: 'Available now'
  },
  {
    id: '26-pathfinder-sv-1', year: 2026, make: 'Nissan', model: 'Pathfinder', trim: 'SV', type: 'new',
    priceLabel: '$41,990 MSRP', offerLabel: compliantOffer, priorityReason: '3-row SUV inquiries are accelerating ahead of summer travel season.',
    ctaLabel: 'Check Availability', modelSlug: 'pathfinder', imageAlt: '2026 Nissan Pathfinder SV front angle', stockNumber: '#26P4175', availabilityLabel: 'In stock'
  },
  {
    id: '26-pathfinder-sl-1', year: 2026, make: 'Nissan', model: 'Pathfinder', trim: 'SL', type: 'new',
    priceLabel: '$46,450 MSRP', offerLabel: compliantOffer, priorityReason: 'Higher-content Pathfinder trims have limited lot time once listed.',
    ctaLabel: 'Check Availability', modelSlug: 'pathfinder', imageAlt: '2026 Nissan Pathfinder SL side profile', stockNumber: '#26P4232', availabilityLabel: 'Available now'
  },
  {
    id: '26-frontier-sv-1', year: 2026, make: 'Nissan', model: 'Frontier', trim: 'SV', type: 'new',
    priceLabel: '$36,210 MSRP', offerLabel: compliantOffer, priorityReason: 'Truck shoppers are cross-comparing inventory and acting quickly.',
    ctaLabel: 'Check Availability', modelSlug: 'frontier', imageAlt: '2026 Nissan Frontier SV crew cab', stockNumber: '#26F5091', availabilityLabel: 'In stock'
  },
  {
    id: '26-frontier-pro4x-1', year: 2026, make: 'Nissan', model: 'Frontier', trim: 'PRO-4X', type: 'new',
    priceLabel: '$42,780 MSRP', offerLabel: compliantOffer, priorityReason: 'Off-road trims are among the fastest-turning units this month.',
    ctaLabel: 'Check Availability', modelSlug: 'frontier', imageAlt: '2026 Nissan Frontier PRO-4X in red', stockNumber: '#26F5177', availabilityLabel: 'Available now'
  },
];

export const modelSeo = [
  { slug: 'rogue', name: 'Nissan Rogue' },
  { slug: 'sentra', name: 'Nissan Sentra' },
  { slug: 'altima', name: 'Nissan Altima' },
  { slug: 'pathfinder', name: 'Nissan Pathfinder' },
  { slug: 'frontier', name: 'Nissan Frontier' },
  { slug: 'ariya', name: 'Nissan Ariya' },
];
