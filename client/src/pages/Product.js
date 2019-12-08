import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import UnitsSold from '../components/Product/unitsSold';

import { fetchProductInfo } from '../services/productService';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProductInfo(id); // TODO
      setProduct(data);
    };
    fetchData();
  }, [id]);

  return (
    <Layout
      pageName={`Product ${product ? `- ${product.ProductDescription}` : ''}`}
    >
      <UnitsSold id={id} />
    </Layout>
  );
};

export default Product;
