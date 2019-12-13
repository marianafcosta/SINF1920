import React, { useState, useEffect } from 'react';

import KpiBarChart from '../kpiBarChart';

import { fetchAccountBalance } from '../../services/financialService';
import { getYear } from '../../services/yearService';

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

  const updateGraph = () => {
    // both sales and expenses should have an equal amount of months,
    // so you can use either one as a map
    if (accountBalances) {
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

  const fetchData = async () => {
    const res = await getYear();
    const salesResponse = await fetchAccountBalance(
      accountCodes.sales,
      res.data.year, // TODO
      true,
    );
    const expensesResponse = await fetchAccountBalance(
      accountCodes.expenses,
      res.data.year, // TODO
      true,
    );
    setAccountBalances({
      sales: salesResponse.data,
      expenses: expensesResponse.data,
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
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
    />
  );
};

export default SalesAndExpenses;
