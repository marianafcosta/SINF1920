import React, { useState, useEffect } from 'react';
import KpiValue from '../../kpiValue';

import { fetchProductUnitsSold } from '../../../services/productService';

const UnitsSold = ({ id }) => {
  const [unitsSold, setUnitsSold] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProductUnitsSold(id); // TODO
      setUnitsSold(data.unitsSold);
      setValue(data.value);
    };
    fetchData();
  }, [id]);

  return (
    <KpiValue
      title="Units Sold"
      overlayInfo="something something gemp something"
      value={`${unitsSold} (${value} €)`}
      money={false}
    />
  );
};

export default UnitsSold;
