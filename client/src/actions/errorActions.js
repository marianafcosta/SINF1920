import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (data, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg: data.msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
