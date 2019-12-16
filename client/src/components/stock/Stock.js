import React, { useState, useEffect } from 'react';
import { fetchStock } from '../../services/inventoryService';

import KpiValue from '../kpiValue';
import ApiCallError from '../apiCallError';

const Stock = () => {
  const [stock, setStock] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchStock(); // TODO
        setStock(data);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return error ? (
    <ApiCallError title="Stock" />
  ) : (
    <KpiValue
      title="Stock"
      overlayInfo="something something gemp something"
      value={stock}
      unit="€"
      format="0.0a"
    />
  );
};

export default Stock;
