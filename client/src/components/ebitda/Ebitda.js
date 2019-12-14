import React, { useState, useEffect } from 'react';

import { fetchEbitda } from '../../services/financialService';

import KpiValue from '../kpiValue';

const Ebitda = () => {
  const [ebitda, setEbitda] = useState(0);

  const fetchData = async () => {
    const ebitdaData = await fetchEbitda(2019); // TODO
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
      format="0.000a"
    />
  );
};

export default Ebitda;
