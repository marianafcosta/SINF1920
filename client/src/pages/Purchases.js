import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import ProductBacklog from '../components/productBacklog';
import MonthlyPurchases from '../components/monthlyPurchases';
import DebtToSuppliers from '../components/debtToSuppliers';
import Suppliers from '../components/suppliers';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Purchases = () => {
  const classes = useStyles();

  return (
    <Layout pageName="Purchases">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <Suppliers />
          </Grid>
          <Grid item sm={12} md={4}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <ProductBacklog />
              </Grid>
              <Grid item sm={12}>
                <DebtToSuppliers />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <MonthlyPurchases />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Purchases;
