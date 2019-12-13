import React, { useState, useEffect } from 'react';

import KpiValue from '../kpiValue';

import { fetchEarnings } from '../../services/financialService';
import { getYear } from '../../services/yearService';

const Earnings = () => {
  const [earnings, setEarnings] = useState(0);

  const fetchData = async () => {
    const res = await getYear();
    const { data } = await fetchEarnings(res.data.year);
    setEarnings(data);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <KpiValue
      value={earnings}
      unit="€"
      title="Earnings"
      overlayInfo="nem sei se isto é relevante"
    />
  );
};

export default Earnings;
