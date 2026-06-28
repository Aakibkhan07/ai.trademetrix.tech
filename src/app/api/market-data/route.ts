import { NextResponse } from 'next/server';

const NIFTY_SYMBOL = '%5ENSEI';
const SENSEX_SYMBOL = '%5EBSESN';
const YAHOO_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart';

function getUnixDays(year: number) {
  const start = Math.floor(Date.UTC(year, 0, 1) / 1000);
  const end = Math.floor(Date.UTC(year, 11, 31) / 1000);
  return { start, end };
}

async function fetchYahoo(symbol: string, start: number, end: number) {
  const url = `${YAHOO_BASE}/${symbol}?period1=${start}&period2=${end}&interval=1d`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Yahoo Finance returned ${res.status}`);
  const data = await res.json();
  const result = data.chart?.result?.[0];
  if (!result) throw new Error('No data in Yahoo Finance response');

  const timestamps: number[] = result.timestamp || [];
  const quotes = result.indicators?.quote?.[0] || {};
  const closes: (number | null)[] = quotes.close || [];
  const opens: (number | null)[] = quotes.open || [];

  const series: { date: string; close: number; open: number }[] = [];
  for (let i = 0; i < timestamps.length; i++) {
    const c = closes[i];
    if (c === null || c === undefined) continue;
    const d = new Date(timestamps[i] * 1000);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    series.push({ date: dateStr, close: Math.round(c), open: Math.round(opens[i] || c) });
  }
  return series;
}

async function fetchNSEOptions() {
  try {
    const home = await fetch('https://www.nseindia.com', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
    });
    const cookies = home.headers.getSetCookie?.() || [];
    const cookieStr = cookies.map((c: string) => c.split(';')[0]).join('; ');
    if (!cookieStr) return null;

    const res = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Cookie': cookieStr,
        'Referer': 'https://www.nseindia.com/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.records?.strikePrices) return null;
    return {
      niftyStrikes: data.records.strikePrices,
      underlying: data.records.underlyingValue,
      expiry: data.records.expiryDates?.[0] || null,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const now = new Date();
    const { start, end } = getUnixDays(now.getFullYear());

    const [nifty, sensex, nse] = await Promise.all([
      fetchYahoo(NIFTY_SYMBOL, start, end),
      fetchYahoo(SENSEX_SYMBOL, start, end),
      fetchNSEOptions(),
    ]);

    return NextResponse.json({
      nifty,
      sensex,
      nse: nse || null,
      generatedAt: now.toISOString(),
    });
  } catch (err) {
    console.error('Market data fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 502 });
  }
}
