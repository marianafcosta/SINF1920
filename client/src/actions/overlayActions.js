import { CHANGE_OVERLAY_STATUS, SET_FIRST_TOGGLE } from './types';

const changeOverlayStatus = () => ({
  type: CHANGE_OVERLAY_STATUS,
});

const setFirstToggle = value => ({
  type: SET_FIRST_TOGGLE,
  payload: value,
});

export { changeOverlayStatus, setFirstToggle };
