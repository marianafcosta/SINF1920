import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import ProductBacklog from '../components/purchases/productBacklog';
import MonthlyPurchases from '../components/purchases/monthlyPurchases';
import DebtToSuppliers from '../components/purchases/debtToSuppliers';
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
          <Grid item sm={8} md={6}>
            <ProductBacklog />
          </Grid>
          <Grid item sm={8} md={6}>
            <DebtToSuppliers />
          </Grid>
          <Grid item sm={8} md={6}>
            <MonthlyPurchases />
          </Grid>
          <Grid item sm={8} md={6}>
            <Suppliers />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Purchases;
