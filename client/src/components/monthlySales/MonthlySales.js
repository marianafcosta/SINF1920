import React, { useState, useEffect } from 'react';

import KpiBarChart from '../kpiBarChart';

import { fetchAccountBalance } from '../../services/financialService';

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

const MonthlySales = () => {
  const [monthlySales, setMonthlySales] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchAccountBalance('71', true);
        setMonthlySales(
          data.totalCredit.map((monthly, index) => ({
            name: monthNames[index],
            sales: monthly,
          })),
        );
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <KpiBarChart
      title="Sales"
      overlayInfo="Number of units purchased in each month in a year."
      bars={[{ dataKey: 'sales', fill: '#fffba1' }]}
      data={monthlySales}
      error={error}
    />
  );
};

export default MonthlySales;
