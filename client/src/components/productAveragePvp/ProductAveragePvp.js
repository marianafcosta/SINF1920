import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchProductAveragePvp } from '../../services/productService';
import KpiValue from '../kpiValue';
import ApiCallError from '../apiCallError';

const ProductAveragePvp = ({ productId }) => {
  const [averagePvp, setAveragePvp] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        if (productId) {
          const { data } = await fetchProductAveragePvp(productId);
          setAveragePvp(data);
        }
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, [productId]);

  return error ? (
    <ApiCallError title="Average Cost" />
  ) : (
    <KpiValue
      title="Product average PVP"
      overlayInfo="hmmmmmmmm"
      value={averagePvp}
      unit="€/unit"
      format="0.000a"
    />
  );
};

ProductAveragePvp.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductAveragePvp;
