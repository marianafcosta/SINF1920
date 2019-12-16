import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import KpiValue from '../kpiValue';

import { fetchProductAverageCost } from '../../services/productService';

const ProductAverageCost = ({ productId }) => {
  const [averageCost, setAverageCost] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchProductAverageCost(productId); // TODO
        setAverageCost(data);
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <KpiValue
      title="Average Cost"
      overlayInfo="something something gemp something"
      value={averageCost}
      unit="€"
      format="0.0a"
      error={error}
    />
  );
};

ProductAverageCost.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductAverageCost;
