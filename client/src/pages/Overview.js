import React from 'react';
import Layout from '../components/layout/Layout';
import SalesExpenses from '../components/salesAndExpenses';
import BalanceSheet from '../components/balanceSheet';
import TopProducts from '../components/topProducts';
import Products from '../components/inventory/products/Products';

const Overview = () => (
  <Layout pageName="Overview">
    <SalesExpenses />
    <BalanceSheet />
    <TopProducts
      headers={[
        {
          name: 'id',
          label: 'ID',
          link: true,
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
    <Products />
  </Layout>
);

export default Overview;
