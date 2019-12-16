import React, { useState, useEffect } from 'react';
import KpiBarChart from '../kpiBarChart';

import { fetchAccountBalance } from '../../services/financialService';

const accountCodes = {
  sales: '71',
  expenses: '61',
};

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

const testData = [
  {
    name: 'loading',
    uv: 4000,
  },
];

const SalesAndExpenses = () => {
  const [accountBalances, setAccountBalances] = useState(null);
  const [graphData, setGraphData] = useState(testData);
  const [error, setError] = useState(false);

  const updateGraph = () => {
    // both sales and expenses should have an equal amount of months,
    // so you can use either one as a map
    if (accountBalances && !accountBalances.sales.error) {
      setGraphData(
        accountBalances.sales.totalCredit.map((monthly, index) => {
          return {
            name: monthNames[index],
            sales: monthly,
            expenses: accountBalances.expenses.totalDebit[index],
          };
        }),
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const salesResponse = await fetchAccountBalance(
          accountCodes.sales,
          true,
        );
        const expensesResponse = await fetchAccountBalance(
          accountCodes.expenses,
          true,
        );
        setAccountBalances({
          sales: salesResponse.data,
          expenses: expensesResponse.data,
        });
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    updateGraph();
    // eslint-disable-next-line
  }, [accountBalances]);

  return (
    <KpiBarChart
      title="Sales vs Expenses"
      overlay="gemp gemp gemp"
      bars={[
        { dataKey: 'sales', fill: '#fffba1' },
        { dataKey: 'expenses', fill: '#BE6E46' },
      ]}
      data={graphData}
      error={error}
    />
  );
};

export default SalesAndExpenses;
