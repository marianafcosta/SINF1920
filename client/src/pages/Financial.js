import React from 'react';
import Layout from '../components/layout/Layout';

import Ebitda from '../components/ebitda';
import AccountsReceivable from '../components/accountsReceivable';

const Financial = () => (
  <Layout>
    <Ebitda />
    <AccountsReceivable />
  </Layout>
);

export default Financial;
