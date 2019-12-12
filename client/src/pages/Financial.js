import React from 'react';
import Layout from '../components/layout/Layout';

import StabilityRatios from '../components/stabilityRatios';
import Ebitda from '../components/ebitda';
import Ebit from '../components/ebit';
import AccountsReceivable from '../components/accountsReceivable';
import LiquidityRatios from '../components/liquidityRatios';
import SalesAndExpenses from '../components/salesAndExpenses';
import Earnings from '../components/earnings';

const Financial = () => (
  <Layout pageName="Financial">
    <StabilityRatios />
    <Ebitda />
    <Ebit />
    <Earnings />
    <AccountsReceivable />
    <LiquidityRatios />
    <SalesAndExpenses />
  </Layout>
);

export default Financial;
