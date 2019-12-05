import React, { useState, useEffect } from 'react';

import { fetchAccount, fetchEbitda } from '../../services/financialService';

import CustomCard from '../CustomCard';
import KpiValue from '../kpiValue';

const accountCodes = {
  earningsSales: '71', // FOR TEST PURPOSES; in reality, all account codes that start with 71 are related to expenses
  earningsServices: '72', // FOR TEST PURPOSES; in reality, all account codes that start with 61 are related to revenue
  expensesCogs: '61',
  expensesServices: '62',
  expensesPersonnel: '63',
};

const Ebitda = () => {
  const [ebitda, setEbitda] = useState(0);

  const fetchData = async () => {
    const ebitda = await fetchEbitda(2018); // TODO
    setEbitda(ebitda.data.ebitda);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(ebitda);
  }, [ebitda]);

  return (
    <KpiValue
      title="EBITDA"
      overlayInfo="something something gemp something"
      value={ebitda}
    />
  );
};

export default Ebitda;
