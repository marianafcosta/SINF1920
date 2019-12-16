import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiTable from '../kpiTable';

import { fetchTopProducts } from '../../services/salesService';

const TopProducts = ({ headers }) => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTopProducts = async () => {
      setError(false);
      try {
        const { data } = await fetchTopProducts();
        setTableData(data);
      } catch (e) {
        setError(true);
      }
    };
    getTopProducts();
  }, []);

  return (
    <KpiTable
      title="Top products"
      overlayInfo="sdasdf"
      headers={headers}
      data={tableData}
      error={error}
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
