import { CHANGE_OVERLAY_STATUS } from '../actions/types';

const initialState = {
  isSet: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_OVERLAY_STATUS:
      return { ...state, isSet: !state.isSet };
    default:
      return state;
  }
}
