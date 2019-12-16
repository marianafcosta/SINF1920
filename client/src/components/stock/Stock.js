import React, { useState, useEffect } from 'react';
import { fetchStock } from '../../services/inventoryService';

import KpiValue from '../kpiValue';

const Stock = () => {
  const [stock, setStock] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchStock();
        setLoading(false);
        setStock(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <KpiValue
      title="Stock"
      overlayInfo="Value of the products in Stock"
      value={stock}
      unit="€"
      format="0.0a"
      error={error}
      loading={loading}
    />
  );
};

export default Stock;
