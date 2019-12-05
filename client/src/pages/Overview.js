import React from 'react';
import Layout from '../components/layout/Layout';
import SalesExpenses from '../components/salesAndExpenses';
import BalanceSheet from '../components/balanceSheet';

const Overview = () => (
  <Layout>
    <SalesExpenses />
    <BalanceSheet />
  </Layout>
);

export default Overview;
