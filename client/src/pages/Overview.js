import React from 'react';
import Layout from '../components/layout/Layout';
import SalesExpenses from '../components/salesAndExpenses';
import BalanceSheet from '../components/balanceSheet';
import TopProducts from '../components/topProducts';

const Overview = () => (
  <Layout>
    <SalesExpenses />
    <BalanceSheet />
    <TopProducts
      headers={[
        {
          name: 'id',
          label: 'ID',
        },
        {
          name: 'name',
          label: 'Name',
        },
        {
          name: 'value',
          label: 'Value (€)',
        },
      ]}
    />
  </Layout>
);

export default Overview;
