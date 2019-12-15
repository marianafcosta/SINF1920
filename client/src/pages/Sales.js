import React from 'react';
import Layout from '../components/layout/Layout';
import TopProducts from '../components/topProducts';
import TopCustomers from '../components/topCustomers';
import SalesLocation from '../components/salesLocation';
import GrossProfitMargin from '../components/grossProfitMargin';
import MonthlySales from '../components/monthlySales';

const Sales = () => (
  <Layout pageName="Sales">
    <TopProducts />
    <TopCustomers />
    <SalesLocation />
    <GrossProfitMargin />
    <MonthlySales />
  </Layout>
);

export default Sales;
