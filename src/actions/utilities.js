import sysParams from 'sys_params';

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
