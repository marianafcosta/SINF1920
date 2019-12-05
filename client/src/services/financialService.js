import axios from 'axios';

const baseUrl = '/api/financial';

const fetchAccountBalance = (accountId, year, monthly) => {
  return axios.get(
    `${baseUrl}/accountBalance?accountId=${accountId}&year=${year}&monthly=${monthly}`,
  );
};

const fetchAccountBalanceSheet = accountId => {
  return axios.get(`${baseUrl}/accountBalanceSheet`, {
    params: {
      accountId,
    },
  });
};

export { fetchAccountBalance, fetchAccountBalanceSheet };
