import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import KpiValue from '../kpiValue';

import { fetchProductUnitsSold } from '../../services/productService';

const ProductUnitsSold = ({ id }) => {
  const [unitsSold, setUnitsSold] = useState(0);
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchProductUnitsSold(id);
        setLoading(false);
        setUnitsSold(data.unitsSold);
        setValue(data.value);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [id]);

  return (
    <KpiValue
      title="Units Sold"
      overlayInfo="something something gemp something"
      value={`${unitsSold} (${value} €)`}
      error={error}
      loading={loading}
    />
  );
};

ProductUnitsSold.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProductUnitsSold;
