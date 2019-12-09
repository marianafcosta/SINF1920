import React from 'react';
import Layout from '../components/layout/Layout';
import Products from '../components/inventory/products';

const Inventory = () => (
  <Layout pageName="Inventory">
    <Products title="Products" />
  </Layout>
);

export default Inventory;
