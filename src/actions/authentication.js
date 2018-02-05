// module imports
import axios from 'axios';
import to from 'await-to-js';
import jwtDecode from 'jwt-decode';

// local imports
import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  REFRESHING_TOKEN,
  DONE_REFRESHING_TOKEN
} from 'actions/types';
import { isSuccess } from 'actions/utilities';

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
    console.log(decoded);
    localStorage.setItem('access_token', res.data.access_token);
    localStorage.setItem('refresh_token', res.data.refresh_token);
    localStorage.setItem('user_id', decoded.user_id);
    return { success: true };
  } else {
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

export const getOneUser = () => async dispatch => {
  let err, res;
  [err, res] = await to(
    axios.get('/users/' + localStorage.getItem('user_id'), {
      headers: {
        token: localStorage.getItem('access_token')
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
    console.log(res.data);
    return { success: true };
  } else {
    return { success: false, message: res.data.error.text };
  }
};

const getAccessToken = async () => {
  let err, res;
  [err, res] = await to(
    axios.post('oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refresh_token')
    })
  );
  if (err) {
    return {
      success: false,
      message: err.response.data.error_description
    };
  }
  if (isSuccess(res.data)) {
    localStorage.setItem('access_token', res.data.access_token);
    return { success: true };
  } else {
    return { success: false, message: res.data.error.text };
  }
};

export const refreshToken = dispatch => {
  const freshTokenPromise = async () => {
    const res = await getAccessToken();
    if (res.success) {
      dispatch({
        type: DONE_REFRESHING_TOKEN
      });
      return res;
    } else {
      console.log('error refreshing token');
      dispatch({
        type: DONE_REFRESHING_TOKEN
      });
      return res;
    }
  };
  dispatch({
    type: REFRESHING_TOKEN,
    freshTokenPromise
  });

  return freshTokenPromise();
};
