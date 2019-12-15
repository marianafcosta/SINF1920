import React from 'react';
import Layout from '../components/layout/Layout';
import ProductBacklog from '../components/productBacklog';
import MonthlyPurchases from '../components/monthlyPurchases';
import DebtToSuppliers from '../components/debtToSuppliers';
import Suppliers from '../components/suppliers';

const Purchases = () => (
  <Layout pageName="Purchases">
    <ProductBacklog />
    <DebtToSuppliers />
    <MonthlyPurchases />
    <Suppliers />
  </Layout>
);

export default Purchases;
