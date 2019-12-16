import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import KpiValue from '../kpiValue';
import ApiCallError from '../apiCallError';

import { fetchProductUnitsSold } from '../../services/productService';

const ProductUnitsSold = ({ id }) => {
  const [unitsSold, setUnitsSold] = useState(0);
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchProductUnitsSold(id); // TODO
        setUnitsSold(data.unitsSold);
        setValue(data.value);
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, [id]);

  return error ? (
    <ApiCallError title="Units Sold" />
  ) : (
    <KpiValue
      title="Units Sold"
      overlayInfo="something something gemp something"
      value={`${unitsSold} (${value} €)`}
    />
  );
};

ProductUnitsSold.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProductUnitsSold;
