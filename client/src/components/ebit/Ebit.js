import React, { useState, useEffect } from 'react';

import KpiValue from '../kpiValue';

import { fetchEbit } from '../../services/financialService';
import { getYear } from '../../services/yearService';

const Ebit = () => {
  const [ebit, setEbit] = useState(0);

  const fetchData = async () => {
    const res = await getYear();
    const { data } = await fetchEbit(res.data.year);
    setEbit(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiValue
      title="EBIT"
      unit="€"
      overlayInfo="GEEEEEEEEEEEMMMMPPPP"
      value={ebit}
    />
  );
};

export default Ebit;
