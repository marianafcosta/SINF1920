import React, { useState, useEffect } from 'react';
import numeral from 'numeral';
import { fetchAccountBalance } from '../../../services/financialService';

import KpiValue from '../../kpiValue';

const DebtToSuppliers = () => {
  const [debtToSuppliers, setDebtToSuppliers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAccountBalance('22', 2018, false);
      setDebtToSuppliers(data.totalCredit - data.totalDebit);
    };

    fetchData();
  }, []);

  return (
    <KpiValue
      title="Debt To Suppliers"
      overlayInfo="something something gemp something"
      value={numeral(debtToSuppliers).format('0.0a')}
      unit="€"
    />
  );
};

export default DebtToSuppliers;
