import InventoryGrid from '@/components/InventoryGrid';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('New Nissan Inventory', 'Browse new Nissan inventory with transparent pricing and quick quote options.', '/new');
export default function Page() { return <PageShell title="New Nissan Inventory" intro="Explore available new Nissan models and request a focused quote."><InventoryGrid type="new" /></PageShell>; }
