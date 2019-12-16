import React from 'react';
import Layout from '../components/layout/Layout';

import StabilityRatios from '../components/stabilityRatios';
import Ebitda from '../components/ebitda';
import Ebit from '../components/ebit';
import AccountsReceivable from '../components/accountsReceivable';
import LiquidityRatios from '../components/liquidityRatios';
import SalesAndExpenses from '../components/salesAndExpenses';
import Earnings from '../components/earnings';
import ProfitLoss from '../components/profitLoss';
import BalanceSheet from '../components/balanceSheet';

const Financial = () => (
  <Layout pageName="Finances">
    <StabilityRatios />
    <Ebitda />
    <Ebit />
    <Earnings />
    <AccountsReceivable />
    <LiquidityRatios />
    <SalesAndExpenses />
    <ProfitLoss />
    <BalanceSheet />
  </Layout>
);

export default Financial;
