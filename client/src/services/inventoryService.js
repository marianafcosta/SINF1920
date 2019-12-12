import axios from 'axios';

const baseUrl = '/api/inventory';

const fetchProducts = () => axios.get(`${baseUrl}/products`);

const fetchStock = () => axios.get(`${baseUrl}/stock`);

const fetchWarehouses = () => axios.get(`${baseUrl}/warehouses`); // TODO year

export { fetchProducts, fetchStock, fetchWarehouses };
