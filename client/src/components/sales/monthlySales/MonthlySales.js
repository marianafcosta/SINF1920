import React, { useState, useEffect } from 'react';

import KpiBarChart from '../../kpiBarChart';

import { fetchAccountBalance } from '../../../services/financialService';
import { getYear } from '../../../services/yearService';

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
  const [monthlySales, setMonthlySales] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getYear();
      const { data } = await fetchAccountBalance(
        '71',
        res.data.year, // TODO
        true,
      );
      setMonthlySales(
        data.totalCredit.map((monthly, index) => ({
          name: monthNames[index],
          sales: monthly,
        })),
      );
    };

    fetchData();
  }, []);

  return (
    <KpiBarChart
      title="Sales"
      overlay="gemp gemp gemp"
      bars={[{ dataKey: 'sales', fill: '#fffba1' }]}
      data={monthlySales}
    />
  );
};

export default MonthlySales;
