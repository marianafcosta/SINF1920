import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import { fetchProductInfo } from '../services/productService';
import UnitsInStock from '../components/unitsInStock';
import UnitsSold from '../components/productUnitsSold';
import ProductInfo from '../components/productInfo';
import ProductSales from '../components/productSales';
import ProductAveragePvp from '../components/productAveragePvp';
import ProductSuppliers from '../components/productSuppliers';
import AverageCost from '../components/productAverageCost';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProductInfo(id); // TODO
      setProduct(data);
    };
    fetchData();
  }, [id]);

  return (
    <Layout pageName={`Product ${product ? `- ${product.description}` : ''}`}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={6} md={4}>
            <ProductInfo productId={id} />
          </Grid>
          <Grid item sm={6} md={8}>
            <ProductSuppliers productId={id} />
          </Grid>
          <Grid item sm={12}>
            <ProductSales productId={id} />
          </Grid>
          <Grid item sm={6}>
            <AverageCost productId={id} />
          </Grid>
          <Grid item sm={6}>
            <UnitsSold id={id} />
          </Grid>
          <Grid item sm={6}>
            <UnitsInStock productId={id} />
          </Grid>
          <Grid item sm={6}>
            <ProductAveragePvp productId={id} />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Product;
