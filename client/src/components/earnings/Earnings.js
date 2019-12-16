import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KpiValue from '../kpiValue';

import { fetchEarnings } from '../../services/financialService';
import ApiCallError from '../apiCallError';

const Earnings = ({ year }) => {
  const [earnings, setEarnings] = useState(0);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setError(false);
    try {
      const { data } = await fetchEarnings(year);
      setEarnings(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return error ? (
    <ApiCallError title="Earnings" />
  ) : (
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
