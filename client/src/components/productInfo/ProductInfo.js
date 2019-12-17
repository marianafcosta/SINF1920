import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchProductInfo } from '../../services/productService';

import KpiInfoList from '../kpiInfoList';

const ProductInfo = ({ productId }) => {
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        if (productId) {
          setLoading(true);
          const response = await fetchProductInfo(productId);
          setLoading(false);
          setInfo(
            Object.keys(response.data).map(item => ({
              label: item,
              description: response.data[item],
            })),
          );
        }
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <KpiInfoList
      title="Product information"
      overlayInfo="Barcode, description and code of the product"
      data={info}
      error={error}
      loading={loading}
    />
  );
};

ProductInfo.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductInfo;

// TODO list kpi
