// module imports
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { refreshToken } from 'actions/authentication';

export const jwt = ({ dispatch, getState }) => {
  return next => async action => {
    if (typeof action === 'function') {
      if (
        getState().auth.authenticated &&
        localStorage.getItem('access_token')
      ) {
        const accessToken = jwtDecode(localStorage.getItem('access_token'));
        const tokenExpiration = accessToken.exp;
        if (
          tokenExpiration &&
          tokenExpiration * 1000 - moment().valueOf() <= 2000
        ) {
          if (!getState().auth.freshTokenPromise) {
            await refreshToken(dispatch);
            return next(action);
          } else {
            await getState().auth.freshTokenPromise();
            return next(action);
          }
        } else {
          return next(action);
        }
      } else {
        return next(action);
      }
    } else {
      return next(action);
    }
  };
};
