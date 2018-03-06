// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

// local imports
import * as actions from 'actions';
import sysParams from 'sys_params';
import { getTitle, validateAccess } from 'actions/utilities';
import NavigationAppBar from 'components/dashboard/navigation/NavigationAppBar';
import NavigationDrawer from 'components/dashboard/navigation/NavigationDrawer';

// style imports

/**
 * Container that handles UI state for dashboard app bar and drawer
 */
class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      mobileOpen: false,
      firstName: null
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleLogout = () => {
    this.props.logout();
  };

  componentWillMount = async () => {
    if (validateAccess(sysParams.roles.recruiter + sysParams.roles.company)) {
      if (!this.props.user) {
        const res = await this.props.getCurrentUser();
        if (res.success) {
          this.handleSetName(
            this.props.user.first_name || this.props.user.company_name
          );
        }
      }
    } else if (validateAccess(sysParams.roles.admin)) {
      this.handleSetName('Admin');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (!isEqual(nextProps.user, this.props.user)) {
      if (nextProps.user) {
        this.handleSetName(
          nextProps.user.first_name || nextProps.user.company_name
        );
      }
    }
  };

  handleSetName = name => {
    this.setState({
      firstName: name
    });
  };

  getNavItems = () => {
    const routes = sysParams.routes;
    const renderList = [];
    for (let i = 0; i < routes.length; i++) {
      if (validateAccess(routes[i].access)) {
        renderList.push(routes[i]);
      }
    }
    return renderList;
  };

  render() {
    return (
      <FlexView>
        <NavigationAppBar
          title={getTitle(this.props.history.location.pathname)}
          name={this.state.firstName}
          onDrawerToggle={this.handleDrawerToggle}
        />
        <NavigationDrawer
          onSubmitLogout={this.handleLogout}
          onDrawerToggle={this.handleDrawerToggle}
          navItems={this.getNavItems()}
          mobileOpen={this.state.mobileOpen}
        />
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default withRouter(connect(mapStateToProps, actions)(Navigation));
