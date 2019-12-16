import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiTable from '../kpiTable';

import { fetchProducts } from '../../services/inventoryService';

const Products = ({ headers, title }) => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setError(false);
      try {
        const { data } = await fetchProducts();
        setTableData(data);
      } catch (e) {
        setError(true);
      }
    };
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <KpiTable
      title={title}
      overlayInfo="ID, Name, Quantity and Value in euros of the products"
      headers={headers}
      data={tableData}
      error={error}
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
