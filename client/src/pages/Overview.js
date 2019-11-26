import React from 'react';
import Layout from '../components/layout/Layout';
import CustomCard from '../components/CustomCard/CustomCard';

const Overview = () => (
  <Layout>
    <CustomCard
      title="Sales vs Expenses"
      overlayInfo="testing overlay descriptions"
    />
  </Layout>
);

export default Overview;
