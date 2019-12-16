import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import KpiValue from '../kpiValue';

import { fetchProductAverageCost } from '../../services/productService';

const ProductAverageCost = ({ productId }) => {
  const [averageCost, setAverageCost] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchProductAverageCost(productId);
        setLoading(false);
        setAverageCost(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <KpiValue
      title="Average Cost"
      overlayInfo="Average cost of a product"
      value={averageCost}
      unit="€"
      format="0.0a"
      error={error}
      loading={loading}
    />
  );
};

ProductAverageCost.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductAverageCost;
