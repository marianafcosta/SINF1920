import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KpiBarChart from '../../kpiBarChart';

import { fetchAccountBalance } from '../../../services/financialService';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Set',
  'Oct',
  'Nov',
  'Dec',
];

const MonthlySales = ({ year }) => {
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAccountBalance('71', year, true);
      setMonthlySales(
        data.totalCredit.map((monthly, index) => ({
          name: monthNames[index],
          sales: monthly,
        })),
      );
    };

    fetchData();
  }, []);

  return (
    <KpiBarChart
      title="Sales"
      overlayInfo="Number of units purchased in each month in a year."
      bars={[{ dataKey: 'sales', fill: '#fffba1' }]}
      data={monthlySales}
    />
  );
};

MonthlySales.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(MonthlySales);
