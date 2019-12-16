import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiValue from '../kpiValue';
import { fetchUnitsInStock } from '../../services/productService';

const UnitsInStock = ({ productId }) => {
  const [unitsInStock, setUnitsInStock] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const response = await fetchUnitsInStock(productId);
        setUnitsInStock(response.data);
      } catch (e) {
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
      overlayInfo="AHHHHHHHHHH"
      format="0.000a"
      error={error}
    />
  );
};

UnitsInStock.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default UnitsInStock;
