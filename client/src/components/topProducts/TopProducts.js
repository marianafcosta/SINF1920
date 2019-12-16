import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiTable from '../kpiTable';

import { fetchTopProducts } from '../../services/salesService';

const TopProducts = ({ headers }) => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTopProducts = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchTopProducts();
        setLoading(false);
        setTableData(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    getTopProducts();
  }, []);

  return (
    <KpiTable
      title="Top products"
      overlayInfo="List of Top Products, their ID, Name and Value in euros"
      headers={headers}
      data={tableData}
      error={error}
      loading={loading}
    />
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
