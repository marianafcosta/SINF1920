import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import Products from '../components/products';
import Stock from '../components/stock';
import Warehouses from '../components/warehouses';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Inventory = () => {
  const classes = useStyles();

  return (
    <Layout pageName="Inventory">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={6} md={8}>
            <Warehouses />
          </Grid>
          <Grid item sm={6} md={4}>
            <Stock />
          </Grid>
          <Grid item sm={12}>
            <Products title="Products" />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Inventory;
