import React, { useState, useEffect } from 'react';

import KpiBarChart from '../kpiBarChart';

import { fetchAccountBalance } from '../../services/financialService';
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
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return error ? (
    <ApiCallError title="Sales" />
  ) : (
    <KpiBarChart
      title="Sales"
      overlayInfo="Number of units purchased in each month in a year."
      bars={[{ dataKey: 'sales', fill: '#fffba1' }]}
      data={monthlySales}
    />
  );
};

export default MonthlySales;
