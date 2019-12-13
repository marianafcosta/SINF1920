import React, { useState, useEffect } from 'react';

import { fetchAccountsReceivable } from '../../services/financialService';
import { getYear } from '../../services/yearService';

import KpiValue from '../kpiValue';

const AccountsReceivable = () => {
  const [accountsReceivable, setAccountsReceivable] = useState(0);

  const fetchData = async () => {
    const res = await getYear();
    const { data } = await fetchAccountsReceivable(res.data.year); // TODO
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

export default AccountsReceivable;
