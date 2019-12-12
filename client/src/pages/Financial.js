import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';

import StabilityRatios from '../components/stabilityRatios';
import Ebitda from '../components/ebitda';
import Ebit from '../components/ebit';
import AccountsReceivable from '../components/accountsReceivable';
import LiquidityRatios from '../components/liquidityRatios';
import SalesAndExpenses from '../components/salesAndExpenses';
import Earnings from '../components/earnings';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Financial = () => {
  const classes = useStyles();

  return (
    <Layout pageName="Financial">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={6}>
            <SalesAndExpenses />
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={12}>
                <Ebitda />
              </Grid>
              <Grid item xs={6} sm={12}>
                <Ebit />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <LiquidityRatios />
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <Earnings />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <StabilityRatios />
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <AccountsReceivable />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Financial;
