import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomCard from '../CustomCard/CustomCard';
import TableCard from '../TableCard';

import { fetchTopProducts } from '../../services/salesService';

const TopProducts = ({ headers }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getTopProducts = async () => {
      const { data } = await fetchTopProducts();
      setTableData(data);
    };
    getTopProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <CustomCard title="Top Products" overlay="Testing">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

TopProducts.defaultProps = {
  headers: [
    {
      name: 'id',
      label: 'ID',
      link: 'products',
    },
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'quantity',
      label: 'Quantity',
    },
    {
      name: 'value',
      label: 'Value (€)',
    },
  ],
};

TopProducts.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

export default TopProducts;
