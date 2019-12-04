import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import PropTypes from 'prop-types';

const KpiBarChart = ({ bars, data }) => {
  const renderLegend = (value, entry) => {
    const { color } = entry;

    return <span style={{ color }}>{value}</span>;
  };

  return (
    <BarChart width={730} height={250} data={data} styles={{ margin: '0' }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        contentStyle={{ backgroundColor: '#262626' }}
        wrapperStyle={{ color: 'white' }}
      />
      <Legend formatter={renderLegend} />
      {bars.map(bar => (
        <Bar dataKey={bar.dataKey} fill={bar.fill} />
      ))}
    </BarChart>
  );
};

KpiBarChart.propTypes = {
  bars: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string,
      fill: PropTypes.string,
    }),
  ),
  data: PropTypes.arrayOf(PropTypes.any),
};

export default KpiBarChart;
