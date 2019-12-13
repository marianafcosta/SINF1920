import React, { useState, useEffect } from 'react';
import { fetchProductBacklog } from '../../../services/purchasesService';

import KpiValue from '../../kpiValue';

const ProductBacklog = () => {
  const [productBacklog, setProductBacklog] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProductBacklog();
      setProductBacklog(data);
    };

    fetchData();
  }, []);

  return (
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
