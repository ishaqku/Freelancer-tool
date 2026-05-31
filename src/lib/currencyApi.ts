const BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD";

export interface CurrencyRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

let cachedRates: CurrencyRates | null = null;
let cacheTime: number = 0;

export async function fetchRates(): Promise<CurrencyRates> {
  const now = Date.now();
  if (cachedRates && (now - cacheTime) < 3600000) {
    return cachedRates;
  }
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    cachedRates = data;
    cacheTime = now;
    return data;
  } catch (e) {
    console.error("Failed to fetch rates, using fallback", e);
    // Minimal fallback
    return cachedRates || {
      base: "USD",
      date: new Date().toISOString(),
      rates: { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83, CAD: 1.35, AUD: 1.52, PKR: 278, NGN: 1450, PHP: 56, ZAR: 19 }
    };
  }
}

export async function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates?: CurrencyRates | null
): Promise<number> {
  if (from === to) return amount;
  
  const r = rates || await fetchRates();

  if (from === "USD") {
    return amount * (r.rates[to] || 1);
  }

  // Convert to USD first, then to target
  const inUSD = amount / (r.rates[from] || 1);
  return inUSD * (r.rates[to] || 1);
}

export function getCurrencySymbol(currencyCode: string): string {
  const symbols: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", INR: "₹",
    PKR: "₨", PHP: "₱", NGN: "₦", CAD: "C$",
    AUD: "A$", JPY: "¥", CNY: "¥", BRL: "R$",
    MXN: "Mex$", ZAR: "R", RUB: "₽", KRW: "₩"
  };
  return symbols[currencyCode] || currencyCode;
}
