import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomCard from '../../CustomCard/CustomCard';
import TableCard from '../../TableCard';

import { fetchProducts } from '../../../services/inventoryService';

const Products = ({ headers }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await fetchProducts();
      setTableData(data);
    };
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <CustomCard title="Products" overlay="Testing">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

Products.defaultProps = {
  headers: [
    {
      name: 'id',
      label: 'ID',
      link: true,
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

Products.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

export default Products;
