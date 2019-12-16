import React, { useState, useEffect } from 'react';
import { fetchProductBacklog } from '../../services/purchasesService';

import KpiValue from '../kpiValue';
import ApiCallError from '../apiCallError';

const ProductBacklog = () => {
  const [productBacklog, setProductBacklog] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchProductBacklog();
        setProductBacklog(data);
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return error ? (
    <ApiCallError title="Product Backlog" />
  ) : (
    <KpiValue
      title="Product Backlog"
      overlayInfo="something something gemp something"
      value={productBacklog}
      unit="€"
      format="0.0a"
    />
  );
};

export default ProductBacklog;
