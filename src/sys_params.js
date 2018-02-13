export default {
  /* Params:
    // label: String to be displayed on nav
    // icon: Icon to be displayed on nav, taken from material.io/icons/
    // path: redirect path
    // title: String to be displayed on header
    // access: Integer according to summation of role id
    */
  routes: [
    {
      label: 'Dashboard',
      icon: 'PieChart',
      path: '/dashboard',
      title: 'Dashboard',
      access: 7 // all
    },
    {
      label: 'User Management',
      icon: 'AccountCircle',
      path: '/dashboard/usermanagement',
      title: 'User Management',
      access: 1 // admin only
    },
    {
      label: 'Profile',
      icon: 'AccountCircle',
      path: '/dashboard/profile',
      title: 'Profile',
      access: 6 // recruiter + company
    }
  ],
  constants: {
    drawerWidth: 240,
    appBarHeight: 64
  },
  roles: {
    admin: 1, // 001
    recruiter: 2, // 010
    company: 4 // 100
  }
};
