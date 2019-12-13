import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAccountsReceivable } from '../../services/financialService';

import KpiValue from '../kpiValue';

const AccountsReceivable = ({ year }) => {
  const [accountsReceivable, setAccountsReceivable] = useState(0);

  const fetchData = async () => {
    const { data } = await fetchAccountsReceivable(year);
    setAccountsReceivable(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiValue
      title="Accounts Receivable"
      overlayInfo="something something gemp something"
      value={accountsReceivable}
      unit="€"
    />
  );
};

AccountsReceivable.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(AccountsReceivable);
