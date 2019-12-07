import React from 'react';
import Layout from '../components/layout/Layout';

import StabilityRatios from '../components/stabilityRatios';
import Ebitda from '../components/ebitda';
import AccountsReceivable from '../components/accountsReceivable';

const Financial = () => (
  <Layout>
    <StabilityRatios />
    <Ebitda />
    <AccountsReceivable />
  </Layout>
);

export default Financial;
