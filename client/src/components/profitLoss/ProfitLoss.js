import React, { useState, useEffect } from 'react';

import KpiAccountList from '../kpiAccountList';
import ApiCallError from '../apiCallError';

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
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateTable();
    console.log(profitLoss);
    // eslint-disable-next-line
  }, [profitLoss]);

  return error ? (
    <ApiCallError title="Profit and loss statement" />
  ) : (
    <KpiAccountList
      title="Profit and loss statement"
      overlayInfo="ahhh como é que vou fazer as merdas todas a tempo"
      sections={sections}
      data={listData}
    />
  );
};

export default ProfitLoss;
