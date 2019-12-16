import React, { useState, useEffect } from 'react';

import KpiTable from '../kpiTable';
import ApiCallError from '../apiCallError';

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

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const equityResponse = await fetchEquity();
        const assetsResponse = await fetchAssets();
        const liabilitiesResponse = await fetchLiabilities();
        setValues({
          equity: equityResponse.data,
          assets: assetsResponse.data,
          liabilities: liabilitiesResponse.data,
        });
      } catch (error) {
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

  return error ? (
    <ApiCallError title="Stability ratios" />
  ) : (
    <KpiTable
      title="Stability ratios"
      overlayInfo="lajsdfkaosdf"
      headers={headers}
      data={tableData}
    />
  );
};

export default StabilityRatios;
