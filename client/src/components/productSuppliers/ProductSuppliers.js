import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import KpiTable from '../kpiTable';

import { fetchProductSuppliers } from '../../services/productService';

const headers = [
  { name: 'id', label: 'ID', link: 'suppliers' },
  { name: 'name', label: 'Name' },
  { name: 'value', label: 'Value (€)' },
  { name: 'units', label: 'Units' },
];

const ProductSuppliers = ({ productId }) => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchProductSuppliers(productId);
        setLoading(false);
        setTableData(
          data.map(supplier => ({
            id: supplier.id,
            name: supplier.name,
            value: numeral(supplier.value).format('0.0a'),
            units: numeral(supplier.units).format('0.0a'),
          })),
        );
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <KpiTable
      title="Product suppliers"
      overlayInfo="List of suppliers of this product and their informations"
      headers={headers}
      data={tableData}
      error={error}
      loading={loading}
    />
  );
};

ProductSuppliers.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductSuppliers;
