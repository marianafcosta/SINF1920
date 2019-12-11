import React from 'react';
import Layout from '../components/layout/Layout';
import ProductBacklog from '../components/purchases/productBacklog';
import MonthlyPurchases from '../components/purchases/monthlyPurchases';

const Purchases = () => (
  <Layout pageName="Purchases">
    <ProductBacklog />
    <MonthlyPurchases />
  </Layout>
);

export default Purchases;
