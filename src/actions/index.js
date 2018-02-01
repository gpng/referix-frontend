// module imports
import axios from 'axios';
import to from 'await-to-js';
import jwtDecode from 'jwt-decode';

// local imports
import { AUTHENTICATED, UNAUTHENTICATED } from 'actions/types';

export const signup = formData => async dispatch => {
  let err, res;
  [err, res] = await to(axios.post('/users', formData));
  if (err) {
    return {
      success: false,
      message: err.response.data.error_description
    };
  }
  if (isSuccess(res.data)) {
    return { success: true };
  } else {
    return { success: false, message: res.data.error.text };
  }
};

export const login = formData => async dispatch => {
  let err, res;
  let req = formData;
  req.grant_type = 'password';
  [err, res] = await to(axios.post('/oauth/token', req));
  if (err) {
    return {
      success: false,
      message: err.response.data.error_description
    };
  }
  if (isSuccess(res.data)) {
    dispatch({ type: AUTHENTICATED });
    const decoded = jwtDecode(res.data.access_token);
    localStorage.setItem('access_token', res.data.access_token);
    localStorage.setItem('refresh_token', res.data.refresh_token);
    localStorage.setItem('user_id', decoded.user_id);
    return { success: true };
  } else {
    console.log(res.data);
    return { success: false, message: res.data.error_description };
  }
};

export const logout = () => async dispatch => {
  let err, res;
  [err, res] = await to(
    axios.delete('/token/reject', {
      data: {
        refresh_token: localStorage.getItem('refresh_token')
      }
    })
  );
  if (err) {
    return {
      success: false,
      message: err.response.data.error_description
    };
  }
  if (isSuccess(res.data)) {
    dispatch({ type: UNAUTHENTICATED });
    localStorage.clear();
    return { success: true };
  } else {
    return { success: false, message: res.data.error.text };
  }
};

const isSuccess = res => {
  if (res.error) {
    return false;
  }
  return true;
};
