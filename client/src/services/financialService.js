import axios from 'axios';

const baseUrl = '/api/financial';

const fetchAccountBalance = (accountId, year, monthly) => {
  return axios.get(
    `${baseUrl}/accountBalance?accountId=${accountId}&year=${year}&monthly=${monthly}`,
  );
};

export default fetchAccountBalance;
