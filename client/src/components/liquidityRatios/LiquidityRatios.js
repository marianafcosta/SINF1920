import React, { useState, useEffect } from 'react';

import KpiTable from '../kpiTable';

import {
  fetchWorkingCapital,
  fetchCashRatio,
  fetchCurrentRatio,
} from '../../services/financialService';

const headers = [
  { name: 'cash', label: 'Cash ratio' },
  { name: 'current', label: 'Current ratio' },
  {
    name: 'workingCapital',
    label: 'Working capital (€)',
    number: true,
    format: '0.00a',
  },
];

const LiquidityRatios = () => {
  const [ratios, setRatios] = useState({
    cash: 0,
    workingCapital: 0,
    current: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const cashResponse = await fetchCashRatio();
        const workingCapitalResponse = await fetchWorkingCapital();
        const currentResponse = await fetchCurrentRatio();
        setLoading(false);

        setRatios({
          cash: cashResponse.data,
          workingCapital: workingCapitalResponse.data,
          current: currentResponse.data,
        });
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (ratios) {
      setTableData([
        {
          cash: ratios.cash,
          current: ratios.current,
          workingCapital: ratios.workingCapital,
        },
      ]);
    }
  }, [ratios]);

  return (
    <KpiTable
      title="Liquidity ratios"
      overlayInfo="Cash ratio, Current ratio and Working Capital in euros"
      headers={headers}
      data={tableData}
      error={error}
      loading={loading}
    />
  );
};

export default LiquidityRatios;
