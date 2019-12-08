import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiValue from '../kpiValue';
import { fetchUnitsInStock } from '../../services/productService';

const UnitsInStock = ({ productId }) => {
  const [unitsInStock, setUnitsInStock] = useState(null);

  const fetchData = async () => {
    const response = await fetchUnitsInStock(productId);
    setUnitsInStock(response.data);
  };

  useEffect(() => {
    if (productId) {
      fetchData();
    }
  }, []);

  return (
    <KpiValue
      value={unitsInStock ? unitsInStock : 0}
      title="Units in stock"
      unit="units"
      overlayInfo="AHHHHHHHHHH"
    />
  );
};

UnitsInStock.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default UnitsInStock;
