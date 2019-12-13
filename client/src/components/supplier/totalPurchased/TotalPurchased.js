import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { fetchTotalPurchased } from '../../../services/supplierService';

import KpiValue from '../../kpiValue';

const TotalPurchased = ({ id }) => {
  const [totalPurchased, setTotalPurchased] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTotalPurchased(id, 2019);
      setTotalPurchased(data);
    };

    fetchData();
  }, [id]);

  return (
    <KpiValue
      title="Total Purchased"
      overlayInfo="something something gemp something"
      value={numeral(totalPurchased).format('0.0a')}
      unit="€"
    />
  );
};

TotalPurchased.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TotalPurchased;
