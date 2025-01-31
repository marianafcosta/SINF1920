import React, { useState, useEffect } from 'react';

import KpiTable from '../kpiTable';

import {
  fetchAssets,
  fetchEquity,
  fetchLiabilities,
} from '../../services/financialService';

const headers = [
  { name: 'equityToAssets', label: 'Equity to assets' },
  { name: 'debtToEquity', label: 'Debt to equity' },
];

const StabilityRatios = () => {
  const [values, setValues] = useState({
    equity: 0,
    assets: 0,
    liabilities: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const equityResponse = await fetchEquity();
        const assetsResponse = await fetchAssets();
        const liabilitiesResponse = await fetchLiabilities();
        setLoading(false);
        setValues({
          equity: equityResponse.data,
          assets: assetsResponse.data,
          liabilities: liabilitiesResponse.data,
        });
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (values) {
      setTableData([
        {
          equityToAssets: Math.abs(values.equity / values.assets).toFixed(2),
          debtToEquity: Math.abs(values.liabilities / values.equity).toFixed(2),
        },
      ]);
    }
  }, [values]);

  return (
    <KpiTable
      title="Stability ratios"
      overlayInfo="Equity to assets and Debt to equity ratios"
      headers={headers}
      data={tableData}
      error={error}
      loading={loading}
    />
  );
};

export default StabilityRatios;
