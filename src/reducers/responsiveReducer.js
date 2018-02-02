import { RESIZED } from 'actions/types';

export default function(state = { isMobile: null }, action) {
  switch (action.type) {
    case RESIZED:
      return { ...state, isMobile: action.isMobile };
    default:
      return state;
  }
}
