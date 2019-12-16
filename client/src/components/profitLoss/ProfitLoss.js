import React, { useState, useEffect } from 'react';

import KpiAccountList from '../kpiAccountList';

import { fetchProfitLoss } from '../../services/financialService';

const sections = [
  { title: 'Revenue', highlight: true },
  { title: 'Expenses', highlight: true },
  { title: 'Totals', highlight: true },
];

const ProfitLoss = () => {
  const [profitLoss, setProfitLoss] = useState(null);
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(false);

  const updateTable = () => {
    const updatedListData = [];
    if (profitLoss) {
      profitLoss.revenue.forEach(revenue =>
        updatedListData.push({
          section: 'Revenue',
          label: revenue.name,
          description: revenue.value,
        }),
      );
      profitLoss.expenses.forEach(expense =>
        updatedListData.push({
          section: 'Expenses',
          label: expense.name,
          description: expense.value,
        }),
      );
      updatedListData.push({
        section: 'Totals',
        label: 'EBITDA',
        description: profitLoss.ebitda,
      });
      updatedListData.push({
        section: 'Totals',
        label: 'EBIT',
        description: profitLoss.ebit,
      });
      updatedListData.push({
        section: 'Totals',
        label: 'Net income',
        description: profitLoss.netIncome,
      });
      setListData(updatedListData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchProfitLoss();
        setProfitLoss(data);
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateTable();
    // eslint-disable-next-line
  }, [profitLoss]);

  return (
    <KpiAccountList
      title="Profit and loss statement"
      overlayInfo="The profit and loss statement is a financial statement that summarizes the revenues, costs, and expenses incurred during a specified period"
      sections={sections}
      data={listData}
      error={error}
    />
  );
};

export default ProfitLoss;
