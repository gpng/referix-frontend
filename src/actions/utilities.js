import sysParams from 'sys_params';
import jwtDecode from 'jwt-decode';

export const isSuccess = res => {
  if (res.error) {
    return false;
  }
  return true;
};

// get title from sys_params routes
export const getTitle = path => {
  const routes = sysParams.routes;
  const res = routes.filter(route => route.path === path);
  if (res && res.length > 0) {
    return res[0].title;
  }
  return 'Untitled';
};

// get user from access token
export const getUserFromAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    return jwtDecode(accessToken);
  }
  return {};
};

// validate roles against access permissions
export const validateAccess = permissions => {
  return getUserFromAccessToken().role_id & permissions;
};
