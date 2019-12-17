import React, { useState, useEffect } from 'react';
import { fetchProductBacklog } from '../../services/purchasesService';

import KpiValue from '../kpiValue';

const ProductBacklog = () => {
  const [productBacklog, setProductBacklog] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchProductBacklog();
        setLoading(false);
        setProductBacklog(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <KpiValue
      title="Product Backlog"
      overlayInfo="Value of the product that are yet to arrive at a warehouse"
      value={productBacklog}
      unit="€"
      format="0.0a"
      error={error}
      loading={loading}
    />
  );
};

export default ProductBacklog;
