import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEbitda } from '../../services/financialService';

import KpiValue from '../kpiValue';
import ApiCallError from '../apiCallError';

const Ebitda = ({ year }) => {
  const [ebitda, setEbitda] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchEbitda(year);
        setEbitda(data);
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, [year]);

  return error ? (
    <ApiCallError title="EBITDA" />
  ) : (
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
