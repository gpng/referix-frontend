import sysParams from 'sys_params';
import jwtDecode from 'jwt-decode';
import invert from 'lodash/invert';
import find from 'lodash/find';

/**
 * Checks if axios API response is successful
 * @param {object} res
 * @returns {boolean}
 */
export const isSuccess = res => {
  if (res.error) {
    return false;
  }
  return true;
};

/**
 * Get title from sys_params.js
 * @param {string} path
 * @returns {string} 'Untitled' if path not found
 */
export const getTitle = path => {
  const routes = sysParams.routes;
  const res = routes.filter(route => route.path === path);
  if (res && res.length > 0) {
    return res[0].title;
  }
  return 'Untitled';
};

/**
 * Decodes access token to extract user info
 * @returns {object}
 */
export const getUserFromAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    return jwtDecode(accessToken);
  }
  return {};
};

/**
 * Checks permissions against current user role
 * @param {integer} permissions
 * @return {boolean} True if role in permissions
 */
export const validateAccess = permissions => {
  return getUserFromAccessToken().role_id & permissions;
};

/**
 * Get role name from role ID
 * @param {integer} roleID
 */
export const getRoleFromRoleID = roleID => {
  const roles = sysParams.roles;
  return invert(roles)[roleID];
};

/**
 * Get route details based on label name
 * @param {string} label
 */
export const getRouteDetails = label => {
  const routes = sysParams.routes;
  return find(routes, { label });
};

/**
 * Get user api route based on role
 */
export const resolveUserUrl = () => {
  return `/user/${getRoleFromRoleID(getUserFromAccessToken().role_id)}`;
};
