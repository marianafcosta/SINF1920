import React, { useState, useEffect } from 'react';

import { fetchAccountsReceivable } from '../../services/financialService';
import { connect } from 'react-redux';

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

export default connect(({ year }) => ({ year }))(AccountsReceivable);
