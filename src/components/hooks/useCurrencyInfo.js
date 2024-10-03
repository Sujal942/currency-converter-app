import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/41a7805d19c73dbb2f70f5c4/latest/${currency}`
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const result = await res.json();
        console.log("Fetched data:", result.conversion_rates);
        setData(result.conversion_rates);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching currency data:", error);
      }
    };

    if (currency) {
      fetchCurrencyData();
    }
  }, [currency]);

  return { data, error };
}

export default useCurrencyInfo;
