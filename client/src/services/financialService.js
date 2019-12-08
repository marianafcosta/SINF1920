import axios from 'axios';

const baseUrl = '/api/financial';

const fetchAccountBalance = (accountId, year, monthly) => {
  return axios.get(
    `${baseUrl}/account-balance?accountId=${accountId}&year=${year}&monthly=${monthly}`,
  );
};

const fetchAccount = accountId => {
  return axios.get(`${baseUrl}/accounts?accountId=${accountId}`);
};

const fetchEbitda = year => {
  return axios.get(`${baseUrl}/ebitda?year=${year}`);
};

const fetchAccountsReceivable = year =>
  axios.get(`${baseUrl}/accounts-receivable?year=${year}`);

const fetchAccountBalanceSheet = accountId => {
  return axios.get(`${baseUrl}/account-balance-sheet`, {
    params: {
      accountId,
    },
  });
};

const fetchWorkingCapital = () => {
  return axios.get(`${baseUrl}/working-capital`);
};

const fetchCashRatio = () => {
  return axios.get(`${baseUrl}/ratios/cash`);
};

const fetchCurrentRatio = () => {
  return axios.get(`${baseUrl}/ratios/current`);
};

const fetchLiabilities = () => {
  return axios.get(`${baseUrl}/liabilities`, {});
};

const fetchEquity = () => {
  return axios.get(`${baseUrl}/equity`, {});
};

const fetchAssets = () => {
  return axios.get(`${baseUrl}/assets`, {});
};

export {
  fetchAccountBalance,
  fetchAccountBalanceSheet,
  fetchLiabilities,
  fetchEquity,
  fetchAssets,
  fetchAccount,
  fetchEbitda,
  fetchWorkingCapital,
  fetchCashRatio,
  fetchCurrentRatio,
  fetchAccountsReceivable,
};
