import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CustomCard from '../CustomCard';
import TableCard from '../TableCard';

const headers = [
  { name: 'id', label: 'ID' },
  { name: 'name', label: 'Name' },
  { name: 'units', label: 'Units' },
];

const CustomerPurchases = ({ customerId }) => {
  const [purchases, setPurchases] = useState([]);

  const fetchData = () => {
    /*
      response: [
        {
            id: product id,
            name: product name,
            units: units acquired
        }
      ]
      */
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <CustomCard title="Purchases" overlayInfo="dkfngçsdasfsd">
      <TableCard headers={headers} data={purchases} />
    </CustomCard>
  );
};

CustomerPurchases.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default CustomerPurchases;
