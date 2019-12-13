import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KpiValue from '../kpiValue';

import { fetchEarnings } from '../../services/financialService';

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
      format="0.000a"
    />
  );
};

Earnings.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(Earnings);
