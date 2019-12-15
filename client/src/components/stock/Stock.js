import React, { useState, useEffect } from 'react';
import { fetchStock } from '../../services/inventoryService';

import KpiValue from '../kpiValue';

const Stock = () => {
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchStock(); // TODO
      setStock(data);
    };

    fetchData();
  }, []);

  return (
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
