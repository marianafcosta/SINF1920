import axios from 'axios';

const baseUrl = id => `/api/product/${id}`;

const fetchProductUnitsSold = id => axios.get(`${baseUrl(id)}/units-sold`);

export { fetchProductUnitsSold };
