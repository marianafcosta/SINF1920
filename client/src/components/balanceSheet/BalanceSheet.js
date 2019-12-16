import React, { useState, useEffect } from 'react';

import KpiAccountList from '../kpiAccountList';

import { fetchBalanceSheet } from '../../services/financialService';

const sections = [
  { title: 'Assets', highlight: true },
  { title: 'Current assets' },
  { title: 'Non-current assets' },
  { title: 'Liabilities', highlight: true },
  { title: 'Current liabilities' },
  { title: 'Non-current liabilities' },
  { title: 'Equity', highlight: true },
  { title: 'Totals', highlight: true },
];

const BalanceSheet = () => {
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(false);

  const updateTable = () => {
    const updatedListData = [];
    if (balanceSheet) {
      balanceSheet.assets.current.forEach(currentAsset =>
        updatedListData.push({
          section: 'Current assets',
          label: currentAsset.name,
          description: currentAsset.value,
        }),
      );
      balanceSheet.assets.nonCurrent.forEach(nonCurrentAsset =>
        updatedListData.push({
          section: 'Non-current assets',
          label: nonCurrentAsset.name,
          description: nonCurrentAsset.value,
        }),
      );
      balanceSheet.liabilities.current.forEach(currentLiability =>
        updatedListData.push({
          section: 'Current liabilities',
          label: currentLiability.name,
          description: currentLiability.value,
        }),
      );
      balanceSheet.liabilities.nonCurrent.forEach(nonCurrentLiability =>
        updatedListData.push({
          section: 'Non-current liabilities',
          label: nonCurrentLiability.name,
          description: nonCurrentLiability.value,
        }),
      );
      balanceSheet.equity.accounts.forEach(equity =>
        updatedListData.push({
          section: 'Equity',
          label: equity.name,
          description: equity.value,
        }),
      );
      updatedListData.push({
        section: 'Totals',
        label: 'Total assets',
        description: balanceSheet.assets.total,
      });
      updatedListData.push({
        section: 'Totals',
        label: 'Total equity and liabilities',
        description: balanceSheet.assets.total,
      });
      setListData(updatedListData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchBalanceSheet();
        setBalanceSheet(data);
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    updateTable();
    // eslint-disable-next-line
  }, [balanceSheet]);

  return (
    <KpiAccountList
      title="Balance sheet"
      overlayInfo="dfadsf"
      sections={sections}
      data={listData}
      error={error}
    />
  );
};

export default BalanceSheet;
