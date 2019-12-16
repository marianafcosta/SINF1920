import React, { useEffect, useState } from 'react';
import KpiValue from '../kpiValue';

import { fetchGrossProfitMargin } from '../../services/financialService';

const GrossProfitMargin = () => {
  const [margin, setMargin] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const response = await fetchGrossProfitMargin();
        setLoading(false);
        setMargin(response.data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <KpiValue
      value={margin ? `${(margin * 100).toFixed(2)}` : '0'}
      unit="%"
      title="Gross profit margin"
      overlayInfo="Gross profit margin in percentage"
      format="0.000a"
      error={error}
      loading={loading}
    />
  );
};

export default GrossProfitMargin;
