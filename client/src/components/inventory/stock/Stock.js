import React, { useState, useEffect } from 'react';
import numeral from 'numeral';
import { fetchStock } from '../../../services/inventoryService';

import KpiValue from '../../kpiValue';

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
      value={numeral(stock).format('0.0a')}
      unit="€"
    />
  );
};

export default Stock;
