import { useState, useEffect } from 'react';
import { fetchRates, CurrencyRates } from '../lib/currencyApi';

export function useCurrencyRates() {
  const [rates, setRates] = useState<CurrencyRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchRates().then(data => {
      if (mounted) {
        setRates(data);
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) {
        setError(true);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { rates, loading, error };
}
