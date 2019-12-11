import React from 'react';
import Layout from '../components/layout/Layout';
import ProductBacklog from '../components/purchases/productBacklog';
import MonthlyPurchases from '../components/purchases/monthlyPurchases';
import DebtToSuppliers from '../components/purchases/debtToSuppliers';
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
