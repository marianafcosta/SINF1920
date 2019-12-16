import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEbitda } from '../../services/financialService';

import KpiValue from '../kpiValue';

const Ebitda = ({ year }) => {
  const [ebitda, setEbitda] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchEbitda(year);
        setLoading(false);
        setEbitda(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [year]);

  return (
    <KpiValue
      title="EBITDA"
      overlayInfo="something something gemp something"
      value={ebitda}
      unit="€"
      format="0.000a"
      error={error}
      loading={loading}
    />
  );
};

Ebitda.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(Ebitda);
