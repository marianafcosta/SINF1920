import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import KpiValue from '../kpiValue';
import ApiCallError from '../apiCallError';

import { fetchAccountBalance } from '../../services/financialService';

const DebtToSuppliers = ({ year }) => {
  const [debtToSuppliers, setDebtToSuppliers] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);

      try {
        const { data } = await fetchAccountBalance('22', year, false);
        setDebtToSuppliers(data.totalCredit - data.totalDebit);
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, [year]);

  return error ? (
    <ApiCallError title="Debt To Suppliers" />
  ) : (
    <KpiValue
      title="Debt To Suppliers"
      overlayInfo="something something gemp something"
      value={debtToSuppliers}
      unit="€"
      format="0.0a"
    />
  );
};

DebtToSuppliers.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(DebtToSuppliers);
