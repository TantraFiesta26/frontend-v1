'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ApiError, authRequest, destination, type AuthUser } from '@/lib/auth';
import { downloadCsv } from '@/lib/admin';
import { clearSignedIn, hasSessionHint } from '@/lib/session';
import { LoadState, Table } from '@/components/admin/AdminUI';
import {
  capturedRevenue, filterFinanceEntries, financeColumnsForEvent, financeEventLabel, financeRowForEvent, loadAccommodationPayments,
  loadAllEventPayments, loadEventPayments, loadFinanceEvents, loadMerchPayments,
  unallocatedRevenue, type FinanceEntry, type FinanceEvent, type FinanceSection,
} from '@/lib/finances';
import '@/components/admin/admin.css';
import styles from './finances.module.css';

const sections: { id: FinanceSection; label: string }[] = [
  { id: 'event', label: 'Events' },
  { id: 'tshirt', label: 'T-shirts' },
  { id: 'accommodation', label: 'Accommodation' },
];
const money = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
const date = (input: string | null) => input ? new Date(input).toLocaleString('en-IN') : '—';
const shown = (input: string) => input || '—';

export default function FinancesPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    if (!hasSessionHint()) { router.replace('/login'); return; }
    authRequest('/api/auth/me').then(({ data }) => {
      if (!active) return;
      const profile = data.user as AuthUser;
      if (profile.role !== 'super') { router.replace(destination(profile)); return; }
      setUser(profile);
    }).catch(err => {
      if (!active) return;
      if (err instanceof ApiError && err.status === 401) { clearSignedIn(); router.replace('/login'); return; }
      setError(err instanceof Error ? err.message : 'Unable to verify admin access.');
    });
    return () => { active = false; };
  }, [router]);
  if (!user) return <main className="admin-workspace"><LoadState loading={!error} error={error} /></main>;
  return <FinanceDashboard />;
}

function FinanceDashboard() {
  const [section, setSection] = useState<FinanceSection>('event');
  const [events, setEvents] = useState<FinanceEvent[]>([]);
  const [eventId, setEventId] = useState('all');
  const [eventSearch, setEventSearch] = useState('');
  const [entries, setEntries] = useState<FinanceEntry[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState('');
  const [version, setVersion] = useState(0);
  const [tablePage, setTablePage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    let active = true;
    loadFinanceEvents().then(list => { if (active) setEvents(list); })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Unable to load events.'); })
      .finally(() => { if (active) setEventsLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const promise = section === 'event' ? loadAllEventPayments()
      : section === 'tshirt' ? loadMerchPayments() : loadAccommodationPayments();
    promise.then(list => { if (active) { setEntries(list); setError(''); } })
      .catch(err => { if (active) { setEntries([]); setError(err instanceof Error ? err.message : 'Unable to load finances.'); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [section, version]);

  const filteredEvents = useMemo(() => events.filter(event =>
    `${event.name} ${event.id}`.toLowerCase().includes(eventSearch.toLowerCase().trim())
  ), [events, eventSearch]);
  const selectedEvents = eventId === 'all' ? events : events.filter(event => event.id === eventId);
  const currentLabel = sections.find(item => item.id === section)?.label || '';
  const rangeError = fromDate && toDate && fromDate > toDate ? 'Start date must be on or before end date.' : '';
  const filteredEntries = useMemo(() => rangeError ? [] : filterFinanceEntries(entries, fromDate, toDate), [entries, fromDate, toDate, rangeError]);
  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / 50));
  const visibleEntries = filteredEntries.slice((tablePage - 1) * 50, tablePage * 50);
  const rangeSuffix = fromDate || toDate ? `-${fromDate || 'start'}_to_${toDate || 'end'}` : '';
  const datedFile = (name: string) => name.replace(/\.(csv|xlsx)$/i, `${rangeSuffix}.$1`);

  async function exportEntries(name: string, loader: () => Promise<FinanceEntry[]>, event?: FinanceEvent) {
    setError(''); setExporting(name);
    try {
      const list = filterFinanceEntries(await loader(), fromDate, toDate);
      downloadCsv(datedFile(name), [financeColumnsForEvent(!!event?.isTeamEvent), ...list.map(entry => financeRowForEvent(entry, !!event?.isTeamEvent, event && financeEventLabel(event)))]);
    } catch (err) { setError(err instanceof Error ? err.message : 'Export failed.'); }
    finally { setExporting(''); }
  }

  async function exportAllEvents() {
    setError(''); setExporting('all-events-payments.csv');
    try {
      const [allEvents, allOrders] = await Promise.all([loadFinanceEvents(), loadAllEventPayments()]);
      const orders = filterFinanceEntries(allOrders, fromDate, toDate);
      const tables = allEvents.flatMap(event => [
        [financeEventLabel(event)],
        financeColumnsForEvent(event.isTeamEvent),
        ...orders.filter(entry => entry.eventId === event.id).map(entry => financeRowForEvent(entry, event.isTeamEvent, financeEventLabel(event))),
        [],
      ]);
      downloadCsv(datedFile('all-events-payments.csv'), tables);
    } catch (err) { setError(err instanceof Error ? err.message : 'Export failed.'); }
    finally { setExporting(''); }
  }

  async function exportMaster() {
    setError(''); setExporting('workbook');
    try {
      const [allEvents, eventOrders, tshirtOrders, accommodationOrders] = await Promise.all([
        loadFinanceEvents(), loadAllEventPayments(), loadMerchPayments(), loadAccommodationPayments(),
      ]);
      setExporting('Excel file');
      const { downloadFinanceWorkbook } = await import('@/lib/finance-workbook');
      await downloadFinanceWorkbook(
        allEvents,
        filterFinanceEntries(eventOrders, fromDate, toDate),
        filterFinanceEntries(tshirtOrders, fromDate, toDate),
        filterFinanceEntries(accommodationOrders, fromDate, toDate),
        fromDate,
        toDate,
      );
    } catch (err) { setError(err instanceof Error ? err.message : 'Excel export failed.'); }
    finally { setExporting(''); }
  }

  return <main className="admin-workspace"><div className={styles.page}>
    <Link className={styles.back} href="/admin/super">← Back to super admin</Link>
    <div className="admin-content">
      <header className="admin-topbar"><div><p className="admin-eyebrow">FESTIVAL OPERATIONS</p><h1>Finances</h1><p>Every recorded checkout, grouped by events, T-shirts, and accommodation.</p></div><div className="admin-topbar-actions"><button type="button" disabled={!!exporting || eventsLoading || !!rangeError} onClick={exportMaster}>{exporting ? `Preparing ${exporting}…` : 'Export master Excel'}</button><button type="button" disabled={loading} onClick={() => { setLoading(true); setVersion(v => v + 1); }}>Refresh</button></div></header>
      <div className={styles.notice} role="note">Only successful checkouts and manually confirmed payments appear here. Revenue is the gross amount received; refunds are not recorded here. Fees beside event names are the current configured prices; payment amounts reflect what was actually charged. An unallocated amount means a successful checkout was not fully matched to shirts or nights.</div>
      <div className={styles.dateRange} role="group" aria-label="Payment date range"><div><strong>Payment date range</strong><small>Dates use your browser’s time zone. Leave either date blank for an open range.</small></div><label>From<input type="date" value={fromDate} max={toDate || undefined} onChange={e => { setFromDate(e.target.value); setTablePage(1); }} /></label><label>To<input type="date" value={toDate} min={fromDate || undefined} onChange={e => { setToDate(e.target.value); setTablePage(1); }} /></label><button type="button" disabled={!fromDate && !toDate} onClick={() => { setFromDate(''); setToDate(''); setTablePage(1); }}>Clear dates</button></div>
      {rangeError && <p className="admin-error" role="alert">{rangeError}</p>}
      <div className={styles.tabs} role="group" aria-label="Finance section">{sections.map(item => <button key={item.id} type="button" className={section === item.id ? styles.active : ''} aria-pressed={section === item.id} onClick={() => { if (section === item.id) return; setSection(item.id); setEntries([]); setTablePage(1); setLoading(true); setError(''); }}>{item.label}</button>)}</div>
      {error && <p className="admin-error" role="alert">{error}</p>}

      {section === 'event' && <section aria-label="Event selection">
        <div className="admin-section-heading"><div><h2>Events</h2><p>Choose one event or show every event table in sequence.</p></div><span>{events.length} events</span></div>
        <label className={styles.search}>Find event<input value={eventSearch} onChange={e => setEventSearch(e.target.value)} placeholder="Event name or ID" /></label>
        {eventsLoading ? <p role="status">Loading events…</p> : <div className={styles.eventList}>
          <div className={`${styles.eventOption} ${eventId === 'all' ? styles.eventSelected : ''}`}><button type="button" onClick={() => setEventId('all')} aria-pressed={eventId === 'all'}><strong>All events</strong><small>Show every table below</small></button><button type="button" className={styles.miniExport} disabled={!!exporting || !!rangeError} onClick={exportAllEvents}>CSV</button></div>
          {filteredEvents.map(event => <div key={event.id} className={`${styles.eventOption} ${event.id === eventId ? styles.eventSelected : ''}`}><button type="button" onClick={() => setEventId(event.id)} aria-pressed={event.id === eventId}><strong>{financeEventLabel(event)}</strong><small>{event.isTeamEvent ? event.feeMode === 'per_participant' ? 'Team · per person' : 'Team · flat fee' : 'Individual'}</small></button><button type="button" className={styles.miniExport} disabled={!!exporting || !!rangeError} onClick={() => exportEntries(`${event.id}-payments.csv`, () => loadEventPayments(event), event)}>CSV</button></div>)}
        </div>}
      </section>}

      {section === 'event' ? <section aria-label="Event order tables">
        <div className={styles.total}><span>All events gross revenue</span><strong>{loading ? 'Loading…' : money(capturedRevenue(filteredEntries))}</strong></div>
        {selectedEvents.map(event => {
          const matching = filteredEntries.filter(entry => entry.eventId === event.id);
          return <div key={event.id} className={styles.eventTable}><div className="admin-section-heading"><h2>{financeEventLabel(event)}</h2><button type="button" disabled={!!exporting || !!rangeError} onClick={() => exportEntries(`${event.id}-payments.csv`, () => loadEventPayments(event), event)}>Export event CSV</button></div>
            <div className={styles.total}><span>Gross revenue</span><strong>{loading ? 'Loading…' : money(capturedRevenue(matching))}</strong><small>{matching.length} paid orders</small></div>
            <Table headings={['Payment ID', 'Amount', ...(event.isTeamEvent ? ['Team members'] : []), 'Fee type', 'Leader / participant', 'TF ID', 'Email', 'Team', 'Current team members (name · TF ID)', 'Paid at', 'Order ID']} empty={!matching.length}>{matching.map(entry => <tr key={entry.referenceId}><td>{shown(entry.paymentId)}</td><td>{money(entry.amount)}</td>{event.isTeamEvent && <td>{entry.teamMemberCount ?? '—'}</td>}<td>{shown(entry.feeType)}</td><td>{shown(entry.name)}</td><td>{shown(entry.festId)}</td><td>{shown(entry.email)}</td><td>{shown(entry.teamName)}</td><td className={styles.members}>{shown(entry.members)}</td><td>{date(entry.paidAt)}</td><td>{shown(entry.orderId)}</td></tr>)}</Table>
          </div>;
        })}
      </section> : <section aria-label={`${currentLabel} ledger`}>
        <div className="admin-section-heading"><div><h2>{currentLabel}</h2><p>One row per checkout. The item or night details show what each payment covered.</p></div><button type="button" disabled={!!exporting || loading || !!rangeError} onClick={() => exportEntries(section === 'tshirt' ? 'tantrafiesta-tshirts.csv' : 'tantrafiesta-accommodation.csv', section === 'tshirt' ? loadMerchPayments : loadAccommodationPayments)}>Export {currentLabel} CSV</button></div>
        <div className={styles.total}><span>Gross revenue</span><strong>{loading ? 'Loading…' : money(capturedRevenue(filteredEntries))}</strong><small>{filteredEntries.length} paid orders</small>{unallocatedRevenue(filteredEntries) > 0 && <small>Unallocated captured: {money(unallocatedRevenue(filteredEntries))}</small>}</div>
        <Table headings={section === 'tshirt' ? ['Payment ID', 'T-shirt type', 'Items / sizes', 'Order amount', 'TF ID', 'Buyer', 'Email', 'Paid at', 'Order ID'] : ['Payment ID', 'Night(s)', 'Details', 'Order amount', 'TF ID', 'Guest', 'Email', 'Paid at', 'Order ID']} empty={!filteredEntries.length}>{visibleEntries.map(entry => <tr key={entry.referenceId}><td>{shown(entry.paymentId)}</td><td>{shown(entry.title)}</td><td className={styles.members}>{shown(entry.detail)}</td><td>{money(entry.amount)}</td><td>{shown(entry.festId)}</td><td>{shown(entry.name)}</td><td>{shown(entry.email)}</td><td>{date(entry.paidAt)}</td><td>{shown(entry.orderId)}</td></tr>)}</Table>
        {pageCount > 1 && <div className="admin-actions"><button type="button" disabled={tablePage <= 1} onClick={() => setTablePage(page => page - 1)}>Previous</button><span>Page {tablePage} of {pageCount}</span><button type="button" disabled={tablePage >= pageCount} onClick={() => setTablePage(page => page + 1)}>Next</button></div>}
      </section>}
    </div>
  </div></main>;
}
