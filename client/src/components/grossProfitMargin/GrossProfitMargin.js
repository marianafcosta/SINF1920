import React, { useEffect, useState } from 'react';
import KpiValue from '../kpiValue';

import { fetchGrossProfitMargin } from '../../services/financialService';

const GrossProfitMargin = () => {
  const [margin, setMargin] = useState(null);

  const fetchData = async () => {
    const response = await fetchGrossProfitMargin();
    setMargin(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiValue
      value={margin ? `${margin * 100}` : '0'}
      unit="%"
      title="Gross profit margin"
      overlayInfo="akjfnlakdjhfals"
    />
  );
};

export default GrossProfitMargin;
