import { SET_FISCAL_YEAR } from './types';

import getYear from '../services/yearService';

const setYear = () => async dispatch => {
  const { data } = await getYear();
  dispatch({
    type: SET_FISCAL_YEAR,
    payload: data.year,
  });
};

export default setYear;
