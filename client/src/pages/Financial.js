import React from 'react';
import Layout from '../components/layout/Layout';

import StabilityRatios from '../components/stabilityRatios';
import Ebitda from '../components/ebitda';
import AccountsReceivable from '../components/accountsReceivable';
import LiquidityRatios from '../components/liquidityRatios';

const Financial = () => (
  <Layout pageName="Financial">
    <StabilityRatios />
    <Ebitda />
    <AccountsReceivable />
    <LiquidityRatios />
  </Layout>
);

export default Financial;
