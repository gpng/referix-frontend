export default {
  /* Params:
    // label: String to be displayed on nav
    // icon: Icon to be displayed on nav, taken from material.io/icons/
    // path: redirect path
    // title: String to be displayed on header
    */
  routes: [
    {
      label: 'Dashboard',
      icon: 'PieChart',
      path: '/dashboard',
      title: 'Dashboard'
    },
    {
      label: 'Profile',
      icon: 'AccountCircle',
      path: '/dashboard/profile',
      title: 'Profile'
    }
  ],
  constants: {
    drawerWidth: 240,
    appBarHeight: 64
  }
};
