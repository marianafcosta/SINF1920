import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAccountsReceivable } from '../../services/financialService';

import KpiValue from '../kpiValue';
import ApiCallError from '../apiCallError';

const AccountsReceivable = ({ year }) => {
  const [accountsReceivable, setAccountsReceivable] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchAccountsReceivable(year);
        setAccountsReceivable(data);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [year]);

  return error ? (
    <ApiCallError title="Accounts Receivable" />
  ) : (
    <KpiValue
      title="Accounts Receivable"
      overlayInfo="something something gemp something"
      value={accountsReceivable}
      unit="€"
      format="0.000a"
    />
  );
};

AccountsReceivable.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(AccountsReceivable);
