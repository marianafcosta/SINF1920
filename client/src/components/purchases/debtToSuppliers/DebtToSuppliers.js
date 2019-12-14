import React, { useState, useEffect } from 'react';
import { fetchAccountBalance } from '../../../services/financialService';

import KpiValue from '../../kpiValue';

const DebtToSuppliers = () => {
  const [debtToSuppliers, setDebtToSuppliers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAccountBalance('22', 2019, false);
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

export default DebtToSuppliers;
