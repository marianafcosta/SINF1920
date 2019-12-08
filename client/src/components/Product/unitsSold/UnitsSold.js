import React, { useState } from 'react';
import KpiValue from '../../kpiValue';

import { fetchProductUnitsSold } from '../../../services/productService';

const UnitsSold = ({ id }) => {
  const [unitsSold, setUnitsSold] = useState(0);
  const [value, setValue] = useState(0);

  const fetchData = async () => {
    const { data } = await fetchProductUnitsSold(); // TODO
    setUnitsSold(data.unitsSold);
    setValue(data.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiValue
      title="Units Sold"
      overlayInfo="something something gemp something"
      value={`${unitsSold} (${value} €)`}
    />
  );
};

export default UnitsSold;
