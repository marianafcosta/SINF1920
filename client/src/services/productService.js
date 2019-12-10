import axios from 'axios';

const baseUrl = id => `/api/products/${id}`;

const fetchProductUnitsSold = id => axios.get(`${baseUrl(id)}/units-sold`);

const fetchUnitsInStock = id => {
  return axios.get(`${baseUrl(id)}/units-in-stock`);
};

const fetchProductInfo = id => axios.get(`${baseUrl(id)}`);

const fetchProductAveragePvp = id => {
  return axios.get(`${baseUrl(id)}/average-pvp`);
};

export {
  fetchProductUnitsSold,
  fetchProductInfo,
  fetchUnitsInStock,
  fetchProductAveragePvp,
};
