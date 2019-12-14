import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomCard from '../CustomCard';
import TableCard from '../TableCard';
import { fetchSalesByLocation } from '../../services/salesService';

const headers = [
  { name: 'location', label: 'Location' },
  { name: 'quantity', label: 'Quantity' },
  { name: 'netTotal', label: 'Net total (€)' },
];

const SalesLocation = ({ year }) => {
  const [locations, setLocations] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchLocations = async () => {
    const locationsResponse = await fetchSalesByLocation(year);
    const locationsData = locationsResponse.data;
    console.log(locationsResponse.data);
    setLocations(locationsData);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

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

  return (
    <CustomCard title="Sales by location" overlayInfo="oh not gemp">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

SalesLocation.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(SalesLocation);
