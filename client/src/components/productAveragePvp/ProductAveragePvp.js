import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchProductAveragePvp } from '../../services/productService';
import KpiValue from '../kpiValue';

const ProductAveragePvp = ({ productId }) => {
  const [averagePvp, setAveragePvp] = useState(0);

  const fetchData = async () => {
    if (productId) {
      const { data } = await fetchProductAveragePvp(productId);
      setAveragePvp(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
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
