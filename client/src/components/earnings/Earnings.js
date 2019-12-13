import React, { useState, useEffect } from 'react';

import KpiValue from '../kpiValue';

import { fetchEarnings } from '../../services/financialService';
import { connect } from 'react-redux';


const Earnings = ({ year }) => {
  const [earnings, setEarnings] = useState(0);

  const fetchData = async () => {
    const { data } = await fetchEarnings(year);
    setEarnings(data);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <KpiValue
      value={earnings}
      unit="€"
      title="Earnings"
      overlayInfo="nem sei se isto é relevante"
    />
  );
};

export default connect(({ year }) => ({ year }))(Earnings);
