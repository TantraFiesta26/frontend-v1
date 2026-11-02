import { adminRequest, enc, record, rows } from './admin';

export type FinanceSection = 'event' | 'tshirt' | 'accommodation';

export type FinanceEvent = {
  id: string;
  name: string;
  price: number;
  isTeamEvent: boolean;
  feeMode: string | null;
};

export const financeEventLabel = (event: FinanceEvent) =>
  `${event.name} (₹${event.price.toLocaleString('en-IN')} ${event.isTeamEvent && event.feeMode !== 'per_participant' ? 'flat' : 'per person'})`;

export type FinanceEntry = {
  section: FinanceSection;
  eventId: string;
  title: string;
  paymentId: string;
  amount: number;
  teamMemberCount: number | null;
  feeType: string;
  name: string;
  festId: string;
  email: string;
  phone: string;
  teamName: string;
  members: string;
  status: string;
  paidAt: string | null;
  createdAt: string;
  orderId: string;
  referenceId: string;
  detail: string;
  unallocatedAmount: number;
};

export async function loadFinanceEvents(): Promise<FinanceEvent[]> {
  return rows(await adminRequest('/api/admin/finances/events')) as FinanceEvent[];
}

async function loadOrders(section: FinanceSection, eventId?: string): Promise<FinanceEntry[]> {
  const query = `section=${section}${eventId ? `&eventId=${enc(eventId)}` : ''}`;
  const data = record(await adminRequest(`/api/admin/finances/orders?${query}`));
  return (rows(data.entries) as FinanceEntry[]).filter(entry => entry.status === 'SUCCESS');
}

export const loadEventPayments = (event: FinanceEvent) => loadOrders('event', event.id);
export const loadAllEventPayments = () => loadOrders('event');
export const loadMerchPayments = () => loadOrders('tshirt');
export const loadAccommodationPayments = () => loadOrders('accommodation');

export function filterFinanceEntries(entries: FinanceEntry[], fromDate: string, toDate: string): FinanceEntry[] {
  if (!fromDate && !toDate) return entries;
  const from = fromDate ? new Date(`${fromDate}T00:00:00`).getTime() : -Infinity;
  const through = toDate ? new Date(`${toDate}T00:00:00`) : null;
  through?.setDate(through.getDate() + 1);
  const until = through?.getTime() ?? Infinity;
  return entries.filter(entry => {
    const timestamp = Date.parse(entry.paidAt || entry.createdAt);
    return Number.isFinite(timestamp) && timestamp >= from && timestamp < until;
  });
}

export const capturedRevenue = (entries: FinanceEntry[]) => entries.reduce(
  (sum, entry) => sum + (entry.status === 'SUCCESS' ? entry.amount : 0), 0
);

export const unallocatedRevenue = (entries: FinanceEntry[]) => entries.reduce(
  (sum, entry) => sum + (entry.status === 'SUCCESS' ? entry.unallocatedAmount : 0), 0
);

export const financeColumns = [
  'Section', 'Event / item / night', 'Payment ID', 'Amount (INR)', 'Team members', 'Fee type',
  'Payer name', 'Payer TF ID', 'Payer email', 'Payer phone', 'Team name',
  'Current team members (name and TF ID)', 'Order status', 'Paid at', 'Created at', 'Order ID',
  'Reference ID', 'Details', 'Unallocated amount (INR)',
];

export const financeColumnsForEvent = (isTeamEvent: boolean) =>
  isTeamEvent ? financeColumns : financeColumns.filter((_, index) => index !== 4);

export function financeRow(entry: FinanceEntry): (string | number | null)[] {
  return [entry.section, entry.title, entry.paymentId, entry.amount, entry.teamMemberCount, entry.feeType,
    entry.name, entry.festId, entry.email, entry.phone, entry.teamName, entry.members,
    entry.status, entry.paidAt, entry.createdAt, entry.orderId, entry.referenceId,
    entry.detail, entry.unallocatedAmount];
}

export const financeRowForEvent = (entry: FinanceEntry, isTeamEvent: boolean, eventLabel?: string) => {
  const row = financeRow(entry);
  if (eventLabel) row[1] = eventLabel;
  return isTeamEvent ? row : row.filter((_, index) => index !== 4);
};
