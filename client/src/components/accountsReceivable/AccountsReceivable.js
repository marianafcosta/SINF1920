import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAccountsReceivable } from '../../services/financialService';

import KpiValue from '../kpiValue';

const AccountsReceivable = ({ year }) => {
  const [accountsReceivable, setAccountsReceivable] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchAccountsReceivable(year);
        setLoading(false);
        setAccountsReceivable(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [year]);

  return (
    <KpiValue
      title="Accounts Receivable"
      overlayInfo="AR is any amount of money owed by customers for purchases made on credit."
      value={accountsReceivable}
      unit="€"
      format="0.00a"
      error={error}
      loading={loading}
    />
  );
};

AccountsReceivable.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(AccountsReceivable);
