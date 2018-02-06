import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  REFRESHING_TOKEN,
  DONE_REFRESHING_TOKEN,
  GET_CURRENT_USER
} from 'actions/types';

export default function(state = { freshTokenPromise: null }, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case REFRESHING_TOKEN:
      return { ...state, freshTokenPromise: action.freshTokenPromise };
    case DONE_REFRESHING_TOKEN:
      return { ...state, freshTokenPromise: null };
    case GET_CURRENT_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
