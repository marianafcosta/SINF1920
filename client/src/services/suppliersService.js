import axios from 'axios';

const baseUrl = id => `/api/suppliers/${id}`;

const fetchSupplierInfo = id => {
  return axios.get(`${baseUrl(id)}`);
};

export default fetchSupplierInfo;
