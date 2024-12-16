import { useState, useEffect } from "react";
import { isValidDateRange, getDateRange } from "../utils";

const BASE_URL = "https://openexchangerates.org/api/historical";
const appId = import.meta.env.VITE_OER_APP_ID;

export function useExchangeRates(startDate, endDate) {
  const [ratesData, setRatesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the date range is valid before fetching
    const validRange = isValidDateRange(startDate, endDate);
    if (!validRange) {
      setRatesData([]);
      return;
    }

    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      try {
        const dates = getDateRange(startDate, endDate);
        const cachedData = [];
        const toFetchDates = [];

        // Check localStorage cache first
        for (let d of dates) {
          const cached = localStorage.getItem(`rate_${d}`);
          if (cached) {
            cachedData.push({ date: d, rate: JSON.parse(cached) });
          } else {
            toFetchDates.push(d);
          }
        }

        let fetchedData = [];
        // Fetch only for dates not in cache
        if (toFetchDates.length > 0) {
          fetchedData = await Promise.all(
            toFetchDates.map(async (d) => {
              const url = `${BASE_URL}/${d}.json?app_id=${appId}`;
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(`Failed to fetch data for ${d}`);
              }
              const data = await response.json();
              const rate = data.rates.ILS;
              localStorage.setItem(`rate_${d}`, JSON.stringify(rate));
              return { date: d, rate };
            })
          );
        }

        const combinedData = [...cachedData, ...fetchedData].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setRatesData(combinedData);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchRates();
  }, [startDate, endDate]);

  return { ratesData, loading, error };
}
