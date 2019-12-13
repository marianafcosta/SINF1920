import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAccountBalance } from '../../../services/financialService';

import KpiValue from '../../kpiValue';

const DebtToSuppliers = ({ year }) => {
  const [debtToSuppliers, setDebtToSuppliers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAccountBalance('22', year, false);
      setDebtToSuppliers(data.totalCredit - data.totalDebit);
    };

    fetchData();
  }, []);

  return (
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
