// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { withStyles } from 'material-ui/styles';
import { Route, Switch } from 'react-router-dom';

// local imports
import Navigation from 'containers/dashboard/navigation/Navigation';
import Dashboard from 'containers/dashboard/dashboard/Dashboard';
import Profile from 'containers/dashboard/profile/Profile';
import UserManagement from 'containers/dashboard/user/UserManagement';
import sysParams from 'sys_params';
import * as actions from 'actions';

// style imports

const drawerWidth = sysParams.constants.drawerWidth;
const appBarHeight = sysParams.constants.appBarHeight;

const styles = theme => ({
  content: {
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
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/dashboard/usermanagement"
              component={UserManagement}
            />
            <Route exact path="/dashboard/profile" component={Profile} />
          </Switch>
        </FlexView>
      </FlexView>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(null, actions)(DashboardRoot)
);
