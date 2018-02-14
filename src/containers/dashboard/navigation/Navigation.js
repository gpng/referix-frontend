// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { withRouter } from 'react-router-dom';

// local imports
import * as actions from 'actions';
import sysParams from 'sys_params';
import { getTitle, validateAccess } from 'actions/utilities';
import NavigationAppBar from 'components/dashboard/navigation/NavigationAppBar';
import NavigationDrawer from 'components/dashboard/navigation/NavigationDrawer';

// style imports

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
        await this.props.getCurrentUser();
      }
      this.setState({
        firstName: this.props.user.first_name || this.props.user.company_name
      });
    } else if (validateAccess(sysParams.roles.admin)) {
      this.setState({ firstName: 'Admin' });
    }
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
