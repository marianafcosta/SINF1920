import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEbitda } from '../../services/financialService';

import KpiValue from '../kpiValue';

const Ebitda = ({ year }) => {
  const [ebitda, setEbitda] = useState(0);

  const fetchData = async () => {
    const ebitdaData = await fetchEbitda(year);
    setEbitda(ebitdaData.data.ebitda);
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
    />
  );
};

Ebitda.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(Ebitda);
