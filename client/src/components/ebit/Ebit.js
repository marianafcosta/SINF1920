import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KpiValue from '../kpiValue';

import { fetchEbit } from '../../services/financialService';

const Ebit = ({ year }) => {
  const [ebit, setEbit] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);

      try {
        setLoading(true);
        const { data } = await fetchEbit(year);
        setLoading(false);
        setEbit(data);
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, [year]);

  return (
    <KpiValue
      title="EBIT"
      unit="€"
      overlayInfo="Earnings before Interest and Taxes."
      value={ebit}
      format="0.00a"
      error={error}
      loading={loading}
    />
  );
};

Ebit.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(Ebit);
