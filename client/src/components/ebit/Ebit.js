import React, { useState, useEffect } from 'react';

import KpiValue from '../kpiValue';

import { fetchEbit } from '../../services/financialService';
import { connect } from 'react-redux';

const Ebit = ({ year }) => {
  const [ebit, setEbit] = useState(0);

  const fetchData = async () => {
    const { data } = await fetchEbit(year);
    setEbit(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiValue
      title="EBIT"
      unit="€"
      overlayInfo="GEEEEEEEEEEEMMMMPPPP"
      value={ebit}
    />
  );
};

export default connect(({ year }) => ({ year }))(Ebit);
