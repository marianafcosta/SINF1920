import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import KpiBarChart from '../kpiBarChart';

import { fetchProductUnitsSold } from '../../services/productService';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Set',
  'Oct',
  'Nov',
  'Dec',
];

const testData = [
  {
    name: 'loading',
    uv: 4000,
  },
];

const ProductSales = ({ productId }) => {
  const [graphData, setGraphData] = useState(testData);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchProductUnitsSold(productId, true);
        setGraphData(
          data.value.map((month, index) => ({
            name: monthNames[index],
            sales: month,
          })),
        );
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <KpiBarChart
      title="Product sales"
      overlayInfo="Number of units sold per month in a year."
      bars={[{ dataKey: 'sales', fill: '#fffba1' }]}
      data={graphData}
      error={error}
    />
  );
};

ProductSales.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductSales;
