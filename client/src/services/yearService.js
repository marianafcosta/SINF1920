import axios from 'axios';

const baseUrl = '/api/year';

const getYear = () => axios.get(baseUrl);

export {
  getYear
};