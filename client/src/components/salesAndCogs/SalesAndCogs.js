import React from 'react';
import KpiBarChart from '../kpiBarChart';
import { fetchAccountBalance } from '../../services/financialService';

const testData = [
  {
    name: 'loading',
    uv: 4000,
  },
];

const accountCodes = {
  sales: '71',
  expenses: '61',
};

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

const SalesAndCogs = () => {
    const [tableData, setTableData] = useState(null);

    const fetchData = () => {
        const sales = await fetchAccountBalance(accountCode[1], 2018, true); // TODO year
        const cogs = await fetchAccountBalance(accountCodes[1], 2018, true); // TODO year

        setTableData(monthNames.map((month, index) => ({
            name: month,
            sales: sales.data[index],
            cogs: cogs.data[index],
        })))

    }
  return <KpiBarChart title="Sales vs. cost of goods sold" overlayInfo="HMMMM" />;
};
