import React, { useState, useEffect } from 'react';
import { fetchPurchases } from '../../services/purchasesService';

import KpiBarChart from '../kpiBarChart';
import ApiCallError from '../apiCallError';

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

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchPurchases(true);
        setMonthlyPurchases(
          data.map((month, index) => ({
            name: monthNames[index],
            purchases: month,
          })),
        );
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return error ? (
    <ApiCallError title="Purchases" />
  ) : (
    <KpiBarChart
      title="Purchases"
      overlayInfo="Number of units purchased in each month in a year."
      bars={[{ dataKey: 'purchases', fill: '#fffba1' }]}
      data={monthlyPurchases}
    />
  );
};

export default MonthlyPurchases;
