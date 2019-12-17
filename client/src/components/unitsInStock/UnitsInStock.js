import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiValue from '../kpiValue';
import { fetchUnitsInStock } from '../../services/productService';

const UnitsInStock = ({ productId }) => {
  const [unitsInStock, setUnitsInStock] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const response = await fetchUnitsInStock(productId);
        setLoading(false);
        setUnitsInStock(response.data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    if (productId) {
      fetchData();
    }
  }, [productId]);

  return (
    <KpiValue
      value={unitsInStock}
      title="Units in stock"
      unit="units"
      overlayInfo="Number of units in stock"
      format="0.000a"
      error={error}
      loading={loading}
    />
  );
};

UnitsInStock.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default UnitsInStock;
