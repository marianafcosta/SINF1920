import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KpiValue from '../kpiValue';

import { fetchEbit } from '../../services/financialService';

const Ebit = ({ year }) => {
  const [ebit, setEbit] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);

      try {
        const { data } = await fetchEbit(year);
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
      overlayInfo="GEEEEEEEEEEEMMMMPPPP"
      value={ebit}
      format="0.000a"
      error={error}
    />
  );
};

Ebit.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(Ebit);
