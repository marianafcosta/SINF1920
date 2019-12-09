import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/layout/Layout';

import { fetchProductInfo } from '../services/productService';
import UnitsInStock from '../components/unitsInStock';
import UnitsSold from '../components/Product/unitsSold';
import ProductInfo from '../components/productInfo';

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
    <Layout pageName={`Product ${product ? `- ${product.description}` : ''}`}>
      <UnitsSold id={id} />
      <UnitsInStock productId={id} />
      <ProductInfo productId={id} />
    </Layout>
  );
};

export default Product;
