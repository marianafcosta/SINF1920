import React, { useState, useEffect } from 'react';

import CustomCard from '../CustomCard';
import TableCard from '../TableCard';
import { fetchSalesByLocation } from '../../services/salesService';

const headers = [
  { name: 'location', label: 'Location' },
  { name: 'quantity', label: 'Quantity' },
  { name: 'netTotal', label: 'Net total' },
];

const SalesLocation = () => {
  const [locations, setLocations] = useState(null);
  const [tableData, setTableData] = useState([]);

  const updateTable = () => {
    if (locations) {
      setTableData(
        Object.keys(locations).map(location => {
          return {
            location: location,
            quantity: locations[location].quantity,
            netTotal: locations[location].netTotal,
          };
        }),
      );
    }
  };

  const fetchLocations = async () => {
    const locationsResponse = await fetchSalesByLocation(2018); //TODO
    const locationsData = locationsResponse.data;
    console.log(locationsResponse.data);
    setLocations(locationsData);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    updateTable();
  }, [locations]);

  return (
    <CustomCard title="Sales by location" overlayInfo="oh not gemp">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

export default SalesLocation;
