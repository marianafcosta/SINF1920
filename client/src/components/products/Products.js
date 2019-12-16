import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiTable from '../kpiTable';

import { fetchProducts } from '../../services/inventoryService';

const Products = ({ headers, title }) => {
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
    <KpiTable
      title={title}
      overlay="testing"
      headers={headers}
      data={tableData}
    />
  );
};

Products.defaultProps = {
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
      number: true,
    },
    {
      name: 'value',
      label: 'Value (€)',
      number: true,
    },
  ],
  title: 'Inventory',
};

Products.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  title: PropTypes.string,
};

export default Products;
