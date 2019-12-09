import React, { useEffect, useState } from 'react';

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

  const fetchData = async () => {
    const { data } = await fetchProductUnitsSold(productId, true);
    setGraphData(
      data.value.map((month, index) => ({
        name: monthNames[index],
        sales: month,
      })),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiBarChart
      title="Product sales"
      overlayInfo="FARTAAA DE LDSO"
      bars={[{ dataKey: 'sales', fill: '#fffba1' }]}
      data={graphData}
    />
  );
};

export default ProductSales;
