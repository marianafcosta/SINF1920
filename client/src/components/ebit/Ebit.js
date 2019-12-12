import React, { useState, useEffect } from 'react';

import KpiValue from '../kpiValue';

import { fetchEbit } from '../../services/financialService';

const Ebit = () => {
  const [ebit, setEbit] = useState(0);

  const fetchData = async () => {
    const { data } = await fetchEbit(2018);
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
