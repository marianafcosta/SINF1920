import { CHANGE_OVERLAY_STATUS, SET_FIRST_TOGGLE } from '../actions/types';

const initialState = {
  isSet: false,
  firstToggle: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_OVERLAY_STATUS:
      return { ...state, isSet: !state.isSet };
    case SET_FIRST_TOGGLE:
      return { ...state, firstToggle: action.payload };
    default:
      return state;
  }
}
