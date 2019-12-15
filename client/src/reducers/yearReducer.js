import { SET_FISCAL_YEAR } from '../actions/types';

const initialState = 2018;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FISCAL_YEAR:
      return action.payload;
    default:
      return state;
  }
}
