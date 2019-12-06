import React, { useState, useEffect } from 'react';

import {
  fetchAssets,
  fetchEquity,
  fetchLiabilities,
} from '../../services/financialService';

import CustomCard from '../CustomCard/CustomCard';

const StabilityRatios = () => {
  const [values, setValues] = useState({
    equity: 0,
    assets: 0,
    liabilities: 0,
  });

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
    console.log(values);
  });

  return (
    <CustomCard title="Stability Ratios" overlayInfo="oh guess what more gemp">
      <h1>hmm</h1>
    </CustomCard>
  );
};

export default StabilityRatios;
