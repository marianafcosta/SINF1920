import React, { useState, useEffect } from 'react';

import {
  fetchAssets,
  fetchEquity,
  fetchLiabilities,
} from '../../services/financialService';
import TableCard from '../TableCard';

import CustomCard from '../CustomCard/CustomCard';

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

  const fetchData = async () => {
    const equityResponse = await fetchEquity();
    const assetsResponse = await fetchAssets();
    const liabilitiesResponse = await fetchLiabilities();
    setValues({
      equity: equityResponse.data,
      assets: assetsResponse.data,
      liabilities: liabilitiesResponse.data,
    });
  };

  useEffect(() => {
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
    <CustomCard title="Stability Ratios" overlayInfo="oh guess what more gemp">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

export default StabilityRatios;
