import React, { useState, useEffect } from 'react';

import { fetchAccountsReceivable } from '../../services/financialService';

import KpiValue from '../kpiValue';

const AccountsReceivable = () => {
  const [accountsReceivable, setAccountsReceivable] = useState(0);

  const fetchData = async () => {
    const { data } = await fetchAccountsReceivable(2018); // TODO
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
    />
  );
};

export default AccountsReceivable;
