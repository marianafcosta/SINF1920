import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KpiValue from '../kpiValue';

import { fetchEbit } from '../../services/financialService';

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

Ebit.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(Ebit);
