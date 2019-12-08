import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import TopProducts from '../components/topProducts';
import TopCustomers from '../components/topCustomers';
import SalesLocation from '../components/salesLocation';
import GrossProfitMargin from '../components/grossProfitMargin';
import MonthlySales from '../components/sales/monthlySales';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Sales = () => {
  const classes = useStyles();

  return (
    <Layout pageName="Sales">
      <div className={classes.root}>
        <Grid container spacing={3} alignItems="center">
          <Grid item sm={8}>
            <SalesLocation />
          </Grid>
          <Grid item sm={4}>
            <GrossProfitMargin />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <TopProducts />
          </Grid>
          <Grid item>
            <TopCustomers />
          </Grid>
          <Grid item>
            <MonthlySales />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Sales;
