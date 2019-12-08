import React from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import UnitsSold from '../components/Product/unitsSold';

const Product = () => {
  const { id } = useParams();

  return (
    <Layout>
      <UnitsSold id={id} />
    </Layout>
  );
};

export default Product;
