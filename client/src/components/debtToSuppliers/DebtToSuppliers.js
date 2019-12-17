import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import KpiValue from '../kpiValue';

import { fetchAccountBalance } from '../../services/financialService';

const DebtToSuppliers = ({ year }) => {
  const [debtToSuppliers, setDebtToSuppliers] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);

      try {
        setLoading(true);
        const { data } = await fetchAccountBalance('22', year, false);
        setLoading(false);
        setDebtToSuppliers(data.totalCredit - data.totalDebit);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [year]);

  return (
    <KpiValue
      title="Debt To Suppliers"
      overlayInfo="Capital owed to the suppliers"
      value={debtToSuppliers}
      unit="€"
      format="0.00a"
      error={error}
      loading={loading}
    />
  );
};

DebtToSuppliers.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(DebtToSuppliers);
