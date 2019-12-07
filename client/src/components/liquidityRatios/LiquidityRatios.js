import React, { useState, useEffect } from 'react';

import CustomCard from '../CustomCard';
import TableCard from '../TableCard';

import {
  fetchWorkingCapital,
  fetchCashRatio,
  fetchCurrentRatio,
} from '../../services/financialService';

const headers = [
  { name: 'cash', label: 'Cash ratio' },
  { name: 'current', label: 'Current ratio' },
  { name: 'workingCapital', label: 'Working capital (€)' },
];

const LiquidityRatios = () => {
  const [ratios, setRatios] = useState({
    cash: 0,
    workingCapital: 0,
    current: 0,
  });
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    const cashResponse = await fetchCashRatio();
    const workingCapitalResponse = await fetchWorkingCapital();
    const currentResponse = await fetchCurrentRatio();
    console.log(cashResponse);
    console.log(workingCapitalResponse);
    console.log(currentResponse);
    setRatios({
      cash: cashResponse.data,
      workingCapital: workingCapitalResponse.data,
      current: currentResponse.data,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (ratios) {
      console.log(ratios);
      setTableData([
        {
          cash: ratios.cash,
          current: ratios.current,
          workingCapital: ratios.workingCapital,
        },
      ]);
    }
  }, [ratios]);
  return (
    <CustomCard title="Liquidity Ratios" overlayInfo="G E M P">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

export default LiquidityRatios;
