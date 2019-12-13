import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiValue from '../kpiValue';
import { fetchUnitsInStock } from '../../services/productService';

const UnitsInStock = ({ productId }) => {
  const [unitsInStock, setUnitsInStock] = useState(0);

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
      value={unitsInStock}
      title="Units in stock"
      unit="units"
      overlayInfo="AHHHHHHHHHH"
      format="0.000a"
    />
  );
};

UnitsInStock.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default UnitsInStock;
