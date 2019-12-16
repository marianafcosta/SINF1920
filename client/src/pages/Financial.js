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
import ProfitLoss from '../components/profitLoss';
import BalanceSheet from '../components/balanceSheet';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Financial = () => {
  const classes = useStyles();
  return (
    <Layout pageName="Finances">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <SalesAndExpenses />
          </Grid>
          <Grid item sm={6}>
            <Ebitda />
          </Grid>
          <Grid item sm={6}>
            <Ebit />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AccountsReceivable />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Earnings />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <StabilityRatios />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <LiquidityRatios />
          </Grid>
          <Grid item sm={12}>
            <ProfitLoss />
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
};

export default Financial;
