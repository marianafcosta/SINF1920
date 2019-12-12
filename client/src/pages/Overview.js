import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import SalesExpenses from '../components/salesAndExpenses';
import TopProducts from '../components/topProducts';
import Products from '../components/inventory/products/Products';
import Ebitda from '../components/ebitda';
import Ebit from '../components/ebit';
import TopCustomers from '../components/topCustomers';
import BalanceSheet from '../components/balanceSheet';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Overview = () => {
  const classes = useStyles();

  return (
    <Layout pageName="Overview">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={8} md={6}>
            <SalesExpenses />
          </Grid>
          <Grid item sm={4} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={12}>
                <Ebitda />
              </Grid>
              <Grid item xs={6} sm={12}>
                <Ebit />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} lg={6}>
            <TopCustomers />
          </Grid>
          <Grid item sm={12} lg={6}>
            <Products />
          </Grid>
          <Grid item sm={12} lg={6}>
            <TopProducts
              headers={[
                {
                  name: 'id',
                  label: 'ID',
                  link: true,
                },
                {
                  name: 'name',
                  label: 'Name',
                },
                {
                  name: 'value',
                  label: 'Value (€)',
                },
              ]}
            />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BalanceSheet />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Overview;
