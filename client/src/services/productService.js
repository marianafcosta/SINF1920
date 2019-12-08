import axios from 'axios';

const baseUrl = id => `/api/products/${id}`;

const fetchProductUnitsSold = id => axios.get(`${baseUrl(id)}/units-sold`);

export { fetchProductUnitsSold };
