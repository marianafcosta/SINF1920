import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchProductAveragePvp } from '../../services/productService';
import KpiValue from '../kpiValue';

const ProductAveragePvp = ({ productId }) => {
  const [averagePvp, setAveragePvp] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        if (productId) {
          setLoading(true);
          const { data } = await fetchProductAveragePvp(productId);
          setLoading(false);
          setAveragePvp(data);
        }
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <KpiValue
      title="Product average PVP"
      overlayInfo="hmmmmmmmm"
      value={averagePvp}
      unit="€/unit"
      format="0.000a"
      error={error}
      loading={loading}
    />
  );
};

ProductAveragePvp.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductAveragePvp;
