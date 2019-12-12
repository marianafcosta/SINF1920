import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import SalesExpenses from '../components/salesAndExpenses';
import TopProducts from '../components/topProducts';
import Products from '../components/inventory/products/Products';
import Ebitda from '../components/ebitda';
import TopCustomers from '../components/topCustomers';

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
                <Ebitda /> {/* Profit */}
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={3}>
            <Grid item>
              <TopCustomers />
            </Grid>
            <Grid item>
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
            <Grid item>
              <Products />
            </Grid>
            <Grid item>
              <BalanceSheet />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Overview;
