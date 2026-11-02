import {
  capturedRevenue, financeColumns, financeColumnsForEvent, financeEventLabel, financeRowForEvent, unallocatedRevenue,
  type FinanceEntry, type FinanceEvent,
} from './finances';

const moneyFormat = '"₹"#,##0';
const dateFormat = 'dd mmm yyyy hh:mm';

const safeText = (value: string) => /^[=+@\-\t\r]/.test(value) ? `'${value}` : value;
const excelDate = (value: string | null) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed;
};

export async function downloadFinanceWorkbook(
  events: FinanceEvent[],
  eventEntries: FinanceEntry[],
  tshirtEntries: FinanceEntry[],
  accommodationEntries: FinanceEntry[],
  fromDate = '',
  toDate = '',
) {
  // Loaded only when an admin exports; the rest of the site does not carry ExcelJS.
  const ExcelJS = (await import('exceljs')).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'TantraFiesta Admin';
  workbook.created = new Date();

  function titleRow(sheet: import('exceljs').Worksheet, title: string, width = financeColumns.length) {
    const row = sheet.addRow([title]);
    sheet.mergeCells(row.number, 1, row.number, width);
    row.height = 26;
    row.font = { bold: true, size: 15, color: { argb: 'FFFFFFFF' } };
    row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF241A4C' } };
  }

  function totalRow(sheet: import('exceljs').Worksheet, label: string, amount: number, unallocated = 0) {
    const row = sheet.addRow([label, amount, 'Unallocated captured amount', unallocated]);
    row.font = { bold: true, color: { argb: 'FF153B2E' } };
    row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDF5E8' } };
    row.getCell(2).numFmt = moneyFormat;
    row.getCell(4).numFmt = moneyFormat;
  }

  function detailTable(sheet: import('exceljs').Worksheet, entries: FinanceEntry[], isTeamEvent = false, eventLabel?: string) {
    const header = sheet.addRow(financeColumnsForEvent(isTeamEvent));
    header.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4B367C' } };
    header.alignment = { vertical: 'middle', wrapText: true };
    header.height = 32;
    for (const entry of entries) {
      const values: (string | number | Date | null)[] = financeRowForEvent(entry, isTeamEvent, eventLabel)
        .map(cell => typeof cell === 'string' ? safeText(cell) : cell);
      const offset = isTeamEvent ? 1 : 0;
      values[12 + offset] = excelDate(entry.paidAt);
      values[13 + offset] = excelDate(entry.createdAt);
      const row = sheet.addRow(values);
      row.getCell(4).numFmt = moneyFormat;
      row.getCell(13 + offset).numFmt = dateFormat;
      row.getCell(14 + offset).numFmt = dateFormat;
      row.getCell(18 + offset).numFmt = moneyFormat;
    }
    sheet.addRow([]);
  }

  function setWidths(sheet: import('exceljs').Worksheet) {
    sheet.columns = [
      { width: 17 }, { width: 32 }, { width: 31 }, { width: 18 }, { width: 18 }, { width: 31 },
      { width: 27 }, { width: 18 }, { width: 34 }, { width: 18 }, { width: 26 },
      { width: 55 }, { width: 17 }, { width: 23 }, { width: 23 }, { width: 31 },
      { width: 29 }, { width: 55 }, { width: 25 },
    ];
    sheet.views = [{ state: 'frozen', ySplit: 1 }];
  }

  const summary = workbook.addWorksheet('Summary');
  titleRow(summary, 'TantraFiesta finances', 4);
  summary.addRow(['Gross captured revenue (INR). Refunds are not recorded in this ledger.']);
  summary.addRow(['Unallocated captured amount is included in gross revenue and needs reconciliation.']);
  summary.addRow([`Payment dates: ${fromDate || 'earliest'} to ${toDate || 'latest'} (browser local time, inclusive)`]);
  summary.addRow(['Section', 'Gross captured (INR)', 'Unallocated (INR)', 'Paid orders']);
  summary.getRow(5).font = { bold: true };
  const groups: [string, FinanceEntry[]][] = [
    ['Events', eventEntries], ['T-shirts', tshirtEntries], ['Accommodation', accommodationEntries],
  ];
  for (const [label, entries] of groups) {
    const row = summary.addRow([label, capturedRevenue(entries), unallocatedRevenue(entries), entries.length]);
    row.getCell(2).numFmt = moneyFormat;
    row.getCell(3).numFmt = moneyFormat;
  }
  const grandTotal = [...eventEntries, ...tshirtEntries, ...accommodationEntries];
  const grandRow = summary.addRow(['Total', capturedRevenue(grandTotal), unallocatedRevenue(grandTotal), grandTotal.length]);
  grandRow.font = { bold: true };
  grandRow.getCell(2).numFmt = moneyFormat;
  grandRow.getCell(3).numFmt = moneyFormat;
  summary.getColumn(1).width = 34;
  summary.getColumn(2).width = 24;
  summary.getColumn(3).width = 24;
  summary.getColumn(4).width = 16;

  const eventSheet = workbook.addWorksheet('Events');
  setWidths(eventSheet);
  for (const event of events) {
    const matching = eventEntries.filter(entry => entry.eventId === event.id);
    titleRow(eventSheet, financeEventLabel(event), financeColumnsForEvent(event.isTeamEvent).length);
    totalRow(eventSheet, 'Gross captured revenue', capturedRevenue(matching));
    detailTable(eventSheet, matching, event.isTeamEvent, financeEventLabel(event));
  }

  for (const [name, entries] of [['T-shirts', tshirtEntries], ['Accommodation', accommodationEntries]] as const) {
    const sheet = workbook.addWorksheet(name);
    setWidths(sheet);
    titleRow(sheet, name);
    totalRow(sheet, 'Gross captured revenue', capturedRevenue(entries), unallocatedRevenue(entries));
    detailTable(sheet, entries);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer as BlobPart], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const rangeSuffix = fromDate || toDate ? `-${fromDate || 'start'}_to_${toDate || 'end'}` : '';
  link.download = `tantrafiesta-finances${rangeSuffix}.xlsx`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
