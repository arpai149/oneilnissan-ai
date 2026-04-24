import InventoryGrid from '@/components/InventoryGrid';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Used Inventory', 'Shop quality used vehicles with clear mileage and payment highlights.', '/used');
export default function Page() { return <PageShell title="Used Inventory" intro="Browse pre-owned options and reserve one for a test drive today."><InventoryGrid /></PageShell>; }
