import React from 'react';
import Layout from '../components/layout/Layout';

import StabilityRatios from '../components/stabilityRatios';
import Ebitda from '../components/ebitda';
import Ebit from '../components/ebit';
import AccountsReceivable from '../components/accountsReceivable';
import LiquidityRatios from '../components/liquidityRatios';
import SalesAndExpenses from '../components/salesAndExpenses';

const Financial = () => (
  <Layout pageName="Financial">
    <StabilityRatios />
    <Ebitda />
    <Ebit />
    <AccountsReceivable />
    <LiquidityRatios />
    <SalesAndExpenses />
  </Layout>
);

export default Financial;
