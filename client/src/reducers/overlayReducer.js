import { CHANGE_OVERLAY_STATUS } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case CHANGE_OVERLAY_STATUS:
      return !state;
    default:
      return state;
  }
}
