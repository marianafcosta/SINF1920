import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiTable from '../kpiTable';

import { fetchProducts } from '../../services/inventoryService';

const Products = ({ headers, title }) => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchProducts();
        setLoading(false);
        setTableData(data);
      } catch (e) {
        setLoading(false);
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
      loading={loading}
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
      format: '0.00a',
      number: true,
    },
    {
      name: 'value',
      label: 'Value (€)',
      format: '0.00a',
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
