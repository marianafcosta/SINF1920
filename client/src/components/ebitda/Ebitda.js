import React, { useState, useEffect } from 'react';

import fetchAccountBalance from '../../services/financialService';

import CustomCard from '../CustomCard';

const accountCodes = {
  earningsSales: '71', // FOR TEST PURPOSES; in reality, all account codes that start with 71 are related to expenses
  earningsServices: '72', // FOR TEST PURPOSES; in reality, all account codes that start with 61 are related to revenue
  expensesCogs: '61',
  expensesServices: '62',
  expensesPersonnel: '63',
};

const Ebitda = () => {
  const [ebitda, setEbitda] = useState(null);

  const fetchData = async () => {
    const earningsSalesResponse = await fetchAccountBalance(
      accountCodes.earningsSales,
      2018,
      true,
    ); // TODO
    const earningsServicesResponse = await fetchAccountBalance(
      accountCodes.earningsServices,
      2018,
      true,
    ); // TODO
    const expensesCogsResponse = await fetchAccountBalance(
      accountCodes.expensesCogs,
      2018,
      true,
    ); // TODO
    const expensesServicesResponse = await fetchAccountBalance(
      accountCodes.expensesServices,
      2018,
      true,
    ); // TODO
    const expensesPersonnelResponse = await fetchAccountBalance(
      accountCodes.expensesPersonnel,
      2018,
      true,
    ); // TODO
    setEbitda({
      earningsSales: earningsSalesResponse.data,
      earningsServices: earningsServicesResponse.data,
      expensesCogs: expensesCogsResponse.data,
      expensesServices: expensesServicesResponse.data,
      expensesPersonnel: expensesPersonnelResponse.data,
    });
  };

  useEffect(() => {
    //fetchData();
  }, []);

  useEffect(() => {
    console.log(ebitda);
  }, [ebitda]);

  return (
    <CustomCard
      title="EBITDA"
      overlayInfo="something something gemp something"
    />
  );
};

export default Ebitda;
