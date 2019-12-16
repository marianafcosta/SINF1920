import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import KpiTable from '../kpiTable';
import ApiCallError from '../apiCallError';

import { fetchSalesByLocation } from '../../services/salesService';

const headers = [
  { name: 'location', label: 'Location' },
  { name: 'quantity', label: 'Quantity' },
  { name: 'netTotal', label: 'Net total (€)' },
];

const SalesLocation = ({ year }) => {
  const [locations, setLocations] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setError(false);

      try {
        const locationsResponse = await fetchSalesByLocation(year);
        const locationsData = locationsResponse.data;
        setLocations(locationsData);
      } catch (error) {
        setError(true);
      }
    };
    fetchLocations();
  }, [year]);

  useEffect(() => {
    const updateTable = () => {
      if (locations) {
        setTableData(
          Object.keys(locations).map(location => {
            return {
              location,
              quantity: locations[location].quantity,
              netTotal: locations[location].netTotal,
            };
          }),
        );
      }
    };
    updateTable();
  }, [locations]);

  return error ? (
    <ApiCallError title="Sales by location" />
  ) : (
    <KpiTable
      title="Sales by location"
      overlayInfo="knfalsdjfa"
      headers={headers}
      data={tableData}
    />
  );
};

SalesLocation.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(SalesLocation);
