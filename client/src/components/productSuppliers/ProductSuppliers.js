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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchProductSuppliers(productId);
      setTableData(
        data.map(supplier => ({
          id: supplier.id,
          name: supplier.name,
          value: numeral(supplier.value).format('0.0a'),
          units: numeral(supplier.units).format('0.0a'),
        })),
      );
    };
    fetchData();
  }, [productId]);

  return (
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
