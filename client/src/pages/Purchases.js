import React from 'react';
import Layout from '../components/layout/Layout';
import ProductBacklog from '../components/purchases/productBacklog';
import DebtToSuppliers from '../components/purchases/debtToSuppliers';

const Purchases = () => (
  <Layout pageName="Purchases">
    <ProductBacklog />
    <DebtToSuppliers />
  </Layout>
);

export default Purchases;
