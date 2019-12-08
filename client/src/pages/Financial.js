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
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <StabilityRatios />
          </Grid>
          <Grid item>
            <Ebitda />
          </Grid>
          <Grid item>
            <Ebit />
          </Grid>
          <Grid item>
            <Earnings />
          </Grid>
          <Grid item>
            <AccountsReceivable />
          </Grid>
          <Grid item>
            <LiquidityRatios />
          </Grid>
          <Grid item>
            <SalesAndExpenses />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Financial;
