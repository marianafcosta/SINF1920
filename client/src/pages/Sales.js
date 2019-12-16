import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import TopProducts from '../components/topProducts';
import TopCustomers from '../components/topCustomers';
import SalesLocation from '../components/salesLocation';
import GrossProfitMargin from '../components/grossProfitMargin';
import MonthlySales from '../components/monthlySales';

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
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <MonthlySales />
          </Grid>
          <Grid item sm={6} md={4}>
            <GrossProfitMargin />
          </Grid>
          <Grid item sm={12} lg={5}>
            <TopCustomers />
          </Grid>
          <Grid item sm={12} lg={7}>
            <TopProducts />
          </Grid>
          <Grid item sm={12}>
            <SalesLocation />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Sales;
