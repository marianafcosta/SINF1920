import axios from 'axios';

const baseUrl = id => `/api/products/${id}`;

const fetchProductUnitsSold = (id, monthly) =>
  axios.get(`${baseUrl(id)}/units-sold${monthly ? '?monthly=true' : ''}`);

const fetchUnitsInStock = id => {
  return axios.get(`${baseUrl(id)}/units-in-stock`);
};

const fetchProductInfo = id => axios.get(`${baseUrl(id)}`);

const fetchProductAveragePvp = id => {
  return axios.get(`${baseUrl(id)}/average-pvp`);
};

const fetchProductSuppliers = id => {
  return axios.get(`${baseUrl(id)}/suppliers`, { params: { year: 2019 } });
};
const fetchProductAverageCost = id => axios.get(`${baseUrl(id)}/average-cost`);

export {
  fetchProductUnitsSold,
  fetchProductInfo,
  fetchUnitsInStock,
  fetchProductAveragePvp,
  fetchProductSuppliers,
  fetchProductAverageCost,
};
