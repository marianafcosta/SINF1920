import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import KpiTable from '../kpiTable';
import ApiCallError from '../apiCallError';

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

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchProductSuppliers(productId);
        setTableData(
          data.map(supplier => ({
            id: supplier.id,
            name: supplier.name,
            value: numeral(supplier.value).format('0.0a'),
            units: numeral(supplier.units).format('0.0a'),
          })),
        );
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [productId]);

  return error ? (
    <ApiCallError title="Product suppliers" />
  ) : (
    <KpiTable
      title="Product suppliers"
      overlayInfo="aksjdflsdf"
      headers={headers}
      data={tableData}
    />
  );
};

ProductSuppliers.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductSuppliers;
