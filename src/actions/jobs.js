// module imports
import axios from 'axios';
import to from 'await-to-js';

// local imports
import { isSuccess, getUserFromAccessToken } from 'actions/utilities';

/**
 * Post new job
 * POST /user/:userId/job
 * @param {object} formData
 */
export const postJob = formData => async dispatch => {
  let err, res;
  const userID = getUserFromAccessToken().user_id;
  const req = formData;
  const url = `/user/${userID}/job`;
  const config = {
    headers: {
      token: localStorage.getItem('access_token')
    }
  };
  [err, res] = await to(axios.post(url, req, config));
  if (err) {
    return {
      success: false,
      message: err.response.data.error_description
    };
  }
  if (isSuccess(res.data)) {
    return { success: true };
  } else {
    return { success: false, message: res.data.error_description };
  }
};

/**
 * Edit job
 * PUT /user/:userId/job/:jobId
 * @param {object} formData
 */
export const putJob = formData => async dispatch => {
  let err, res;
  const userID = getUserFromAccessToken().user_id;
  const req = formData;
  const url = `/user/${userID}/job/${req.job_id}`;
  const config = {
    headers: {
      token: localStorage.getItem('access_token')
    }
  };

  // remove unused keys
  delete req.job_id;
  delete req.user_id;
  delete req.created_at;
  delete req.updated_at;

  [err, res] = await to(axios.put(url, req, config));
  if (err) {
    return {
      success: false,
      message: err.response.data.error_description
    };
  }
  if (isSuccess(res.data)) {
    return { success: true };
  } else {
    return { success: false, message: res.data.error_description };
  }
};

/**
 * Get jobs posted by company
 * GET /user/:userId/job
 */
export const getUserJobs = () => async dispatch => {
  let err, res;
  const userID = getUserFromAccessToken().user_id;
  const url = `/user/${userID}/job`;
  const config = {
    headers: {
      token: localStorage.getItem('access_token')
    }
  };
  [err, res] = await to(axios.get(url, config));
  if (err) {
    return {
      success: false,
      message: err.response.data.error_description
    };
  }
  if (isSuccess(res.data)) {
    return { success: true, data: res.data.data };
  } else {
    return { success: false, message: res.data.error_description };
  }
};

/**
 * Get all active jobs
 * GET /jobs
 */
export const getJobs = formData => async dispatch => {
  let err, res;

  const searchText = formData.search_job_text;
  const page = formData.page ? formData.page : 1;
  const url = `/job?page=${page}&search=${searchText}`;
  const config = {
    headers: {
      token: localStorage.getItem('access_token')
    }
  };
  [err, res] = await to(axios.get(url, config));
  if (err) {
    return {
      success: false,
      message: err.response.data.error_description
    };
  }
  if (isSuccess(res.data)) {
    return { success: true, data: res.data.data[0] };
  } else {
    return { success: false, message: res.data.error_description };
  }
};
