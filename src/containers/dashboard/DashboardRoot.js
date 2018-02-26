// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { withStyles } from 'material-ui/styles';
import { Route } from 'react-router-dom';

// local imports
import sysParams from 'sys_params';
import restrictedRoute from 'components/hoc/restrictedRoute';
import * as actions from 'actions';
import { getRouteDetails } from 'actions/utilities';

// containers/components imports
import Navigation from 'containers/dashboard/navigation/Navigation';
import Dashboard from 'containers/dashboard/dashboard/Dashboard';
import Profile from 'containers/dashboard/profile/Profile';
import UserManagement from 'containers/dashboard/usermanagement/UserManagement';
import JobManagement from 'containers/dashboard/jobmanagement/JobManagement';
import ProfileManagement from 'containers/dashboard/profilemanagement/ProfileManagement';
import JobSearch from 'containers/dashboard/jobsearch/JobSearch';

// style imports

const drawerWidth = sysParams.constants.drawerWidth;
const appBarHeight = sysParams.constants.appBarHeight;

const styles = theme => ({
  content: {
    marginTop: appBarHeight,
    backgroundColor: '#ffffff',
    marginLeft: 0,
    width: '100%',
    height: `calc(100vh - ${appBarHeight}px)`,
    padding: 12,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    }
  }
});

/**
 * Returns routing component based on route label
 * TODO: should this be in a seperate file?
 * @param {string} label
 * @param {component} targetComponent
 */
const DefinedRoute = props => {
  const { label, targetComponent } = props;
  const routeDetails = getRouteDetails(label);
  return (
    <Route
      exact
      path={routeDetails.path}
      component={restrictedRoute(targetComponent, routeDetails.access)}
    />
  );
};

class DashboardRoot extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <FlexView column grow>
        <Navigation />
        <FlexView grow className={classes.content}>
          <DefinedRoute label="Dashboard" targetComponent={Dashboard} />
          <DefinedRoute
            label="User Management"
            targetComponent={UserManagement}
          />
          <DefinedRoute
            label="Profile Management"
            targetComponent={ProfileManagement}
          />
          <DefinedRoute label="Profile" targetComponent={Profile} />
          <DefinedRoute label="Your Jobs" targetComponent={JobManagement} />
          <DefinedRoute label="Search Jobs" targetComponent={JobSearch} />
        </FlexView>
      </FlexView>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(null, actions)(DashboardRoot)
);
