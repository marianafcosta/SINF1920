import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    />
  );
};

UnitsSold.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UnitsSold;
