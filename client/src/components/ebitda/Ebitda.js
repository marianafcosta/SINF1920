import React, { useState, useEffect } from 'react';

import { fetchEbitda } from '../../services/financialService';
import { getYear } from '../../services/yearService';

import KpiValue from '../kpiValue';

const Ebitda = () => {
  const [ebitda, setEbitda] = useState(0);

  const fetchData = async () => {
    const res = await getYear();
    const ebitdaData = await fetchEbitda(res.data.year); // TODO
    setEbitda(ebitdaData.data.ebitda);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiValue
      title="EBITDA"
      overlayInfo="something something gemp something"
      value={ebitda}
      unit="€"
    />
  );
};

export default Ebitda;
