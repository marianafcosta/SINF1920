import React from 'react';
import Layout from '../components/layout/Layout';
// eslint-disable-next-line
import CustomCard from '../components/customCard/CustomCard';

const Overview = () => (
  <Layout>
    <CustomCard
      title="Sales vs Expenses"
      overlayInfo="testing overlay descriptions"
    />
  </Layout>
);

export default Overview;
