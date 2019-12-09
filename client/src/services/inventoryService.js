import axios from 'axios';

const baseUrl = '/api/inventory';

const fetchProducts = () => axios.get(`${baseUrl}/products`);

const fetchStock = () => axios.get(`${baseUrl}/stock`);

export { fetchProducts, fetchStock };
