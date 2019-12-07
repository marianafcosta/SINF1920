import React from 'react';
import Layout from '../components/layout/Layout';

import Ebitda from '../components/ebitda';
import AccountsReceivable from '../components/accountsReceivable';
import LiquidityRatios from '../components/liquidityRatios';

const Financial = () => (
  <Layout>
    <Ebitda />
    <AccountsReceivable />
    <LiquidityRatios />
  </Layout>
);

export default Financial;
