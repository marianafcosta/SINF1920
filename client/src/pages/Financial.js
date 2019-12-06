import React from 'react';
import Layout from '../components/layout/Layout';

import StabilityRatios from '../components/stabilityRatios';
import Ebitda from '../components/ebitda';

const Financial = () => (
  <Layout>
    <StabilityRatios />
    <Ebitda />
  </Layout>
);

export default Financial;
