import React from 'react';
import Layout from '../components/layout/Layout';
import TopProducts from '../components/topProducts';
import TopCustomers from '../components/topCustomers';
import SalesLocation from '../components/salesLocation';

const Sales = () => (
  <Layout pageName="Sales">
    <TopProducts />
    <TopCustomers />
    <SalesLocation />
  </Layout>
);

export default Sales;
