import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEbitda } from '../../services/financialService';

import KpiValue from '../kpiValue';

const Ebitda = ({ year }) => {
  const [ebitda, setEbitda] = useState(0);

  const fetchData = async () => {
    const { data } = await fetchEbitda(year);
    setEbitda(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiValue
      title="EBITDA"
      overlayInfo="something something gemp something"
      value={ebitda}
      unit="€"
      format="0.000a"
    />
  );
};

Ebitda.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(Ebitda);
