import React from 'react';
import Layout from '../components/layout/Layout';
import Products from '../components/inventory/products';
import Stock from '../components/inventory/stock';

const Inventory = () => (
  <Layout pageName="Inventory">
    <Products title="Products" />
    <Stock />
  </Layout>
);

export default Inventory;
