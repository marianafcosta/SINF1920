import React, { useState, useEffect } from 'react';
import { fetchPurchases } from '../../services/purchasesService';

import KpiBarChart from '../kpiBarChart';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Set',
  'Oct',
  'Nov',
  'Dec',
];

const MonthlyPurchases = () => {
  const [monthlyPurchases, setMonthlyPurchases] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchPurchases(true);
        setLoading(false);
        setMonthlyPurchases(
          data.map((month, index) => ({
            name: monthNames[index],
            purchases: month,
          })),
        );
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <KpiBarChart
      title="Purchases"
      overlayInfo="Value of products purchased in each month in a year."
      bars={[{ dataKey: 'purchases', fill: '#fffba1' }]}
      data={monthlyPurchases}
      error={error}
      loading={loading}
    />
  );
};

export default MonthlyPurchases;
