import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import SalesExpenses from '../components/salesAndExpenses';
import BalanceSheet from '../components/balanceSheet';
import TopProducts from '../components/topProducts';
import Products from '../components/products/Products';

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
          <Grid item sm={12}>
            <SalesExpenses />
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
          <Grid item sm={12}>
            <BalanceSheet />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Overview;
