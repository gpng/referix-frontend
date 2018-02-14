// module imports
import axios from 'axios';
import to from 'await-to-js';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import sysParams from 'sys_params';

// local imports
import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  REFRESHING_TOKEN,
  DONE_REFRESHING_TOKEN,
  GET_CURRENT_USER
} from 'actions/types';
import {
  isSuccess,
  getRoleFromRoleID,
  getUserFromAccessToken
} from 'actions/utilities';

const resolveUserUrl = () => {
  return `/user/${getRoleFromRoleID(getUserFromAccessToken().role_id)}`;
};

/**
 * User creation for every role
 * POST /user/:role
 * @param {object} formData
 * @param {integer} role This should be taken from sys_params.roles
 */
export const signup = (formData, role) => async dispatch => {
  let err, res, url;
  let config = {};
  switch (role) {
    case sysParams.roles.admin:
      url = '/user/admin';
      config = {
        headers: {
          token: localStorage.getItem('access_token')
        }
      };
      break;
    case sysParams.roles.recruiter:
      url = '/user/recruiter';
      config = {
        headers: {
          token: localStorage.getItem('access_token')
        }
      };
      break;
    case sysParams.roles.company:
      url = '/user/company';
      break;

    default:
      return { success: false, message: 'No role defined' };
  }
  [err, res] = await to(axios.post(url, formData, config));
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

/**
 * Login
 * POST /oauth/token
 * @param {object} formData
 */
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

/**
 * Logout by rejecting token and clearing local storage
 * Force redirect to landing page
 * POST /token/reject
 */
export const logout = () => async dispatch => {
  // call reject token async but don't wait for response
  await axios.delete('/token/reject', {
    data: {
      refresh_token: localStorage.getItem('refresh_token')
    }
  });

  // clear localstorage and logout no matter if call is successful
  dispatch({ type: UNAUTHENTICATED });
  localStorage.clear();
  dispatch(push('/'));
  return { success: true };
};

/**
 * Get current user details
 * GET /user/:role
 */
export const getCurrentUser = () => async dispatch => {
  console.log(resolveUserUrl());
  let err, res;
  [err, res] = await to(
    axios.get(`${resolveUserUrl()}/${localStorage.getItem('user_id')}`, {
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
    dispatch({ type: GET_CURRENT_USER, user: res.data.data[0] });
    return { success: true };
  } else {
    return { success: false, message: res.data.error.text };
  }
};

/**
 * Request for new access token using current refresh token
 * POST /oath/token
 */
const getAccessToken = async () => {
  let err, res;
  [err, res] = await to(
    axios.post('/oauth/token', {
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

/**
 * Dispatches freshTokenPromise to redux store to ensure that all async
 * calls will wait for new access token
 * @param {function} dispatch
 */
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
