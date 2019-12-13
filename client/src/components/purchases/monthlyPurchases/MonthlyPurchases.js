import React, { useState, useEffect } from 'react';
import { fetchPurchases } from '../../../services/purchasesService';

import KpiBarChart from '../../kpiBarChart';

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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPurchases(true);
      setMonthlyPurchases(
        data.map((month, index) => ({
          name: monthNames[index],
          purchases: month,
        })),
      );
    };

    fetchData();
  }, []);

  return (
    <KpiBarChart
      title="Purchases"
      overlayInfo="Number of units purchased in each month in a year."
      bars={[{ dataKey: 'purchases', fill: '#fffba1' }]}
      data={monthlyPurchases}
    />
  );
};

export default MonthlyPurchases;
