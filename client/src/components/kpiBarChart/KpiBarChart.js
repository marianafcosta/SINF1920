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
import numeral from 'numeral';
import PropTypes from 'prop-types';

import CustomCard from '../CustomCard';
import './KpiBarChart.css';

const KpiBarChart = ({ title, overlayInfo, bars, data }) => {
  const renderLegend = (value, entry) => {
    const { color } = entry;

    return <span style={{ color }}>{value}</span>;
  };
  let key = 0;

  return (
    <CustomCard title={title} overlayInfo={overlayInfo}>
      <BarChart
        className="fullwitdh"
        width={600}
        height={250}
        data={data}
        styles={{ margin: '0' }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={tick => numeral(tick).format('0.0a')} />
        <Tooltip
          contentStyle={{ backgroundColor: '#262626' }}
          wrapperStyle={{ color: 'white' }}
          formatter={value => numeral(value).format('0.0a')}
        />
        <Legend className="fullwitdh" formatter={renderLegend} />
        {bars.map(bar => {
          key += 1;
          return <Bar key={key} dataKey={bar.dataKey} fill={bar.fill} />;
        })}
      </BarChart>
    </CustomCard>
  );
};

KpiBarChart.propTypes = {
  title: PropTypes.string.isRequired,
  overlayInfo: PropTypes.string.isRequired,
  bars: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string,
      fill: PropTypes.string,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default KpiBarChart;
