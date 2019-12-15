import axios from 'axios';

const baseUrl = '/api/financial';

const fetchAccountBalance = (accountId, monthly) => {
  return axios.get(
    `${baseUrl}/account-balance?accountId=${accountId}&monthly=${monthly}`,
  );
};

const fetchAccount = accountId => {
  return axios.get(`${baseUrl}/accounts?accountId=${accountId}`);
};

const fetchEbitda = () => {
  return axios.get(`${baseUrl}/ebitda`);
};

const fetchEarnings = () => {
  return axios.get(`${baseUrl}/earnings`);
};

const fetchEbit = () => {
  return axios.get(`${baseUrl}/ebit`);
};

const fetchAccountsReceivable = () =>
  axios.get(`${baseUrl}/accounts-receivable`);

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

const fetchGrossProfitMargin = () => {
  return axios.get(`${baseUrl}/gross-profit-margin`, {});
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
  fetchGrossProfitMargin,
  fetchEarnings,
  fetchEbit,
};
