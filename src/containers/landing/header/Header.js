// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// local imports
import * as actions from 'actions';
import sysParams from 'sys_params';
import HeaderComponent from 'components/landing/header/Header';

// style imports

const toastrOptions = {
  position: 'bottom-center'
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggle: true
    };
  }

  handleLogin = async values => {
    const res = await this.props.login(values);
    if (res.success) {
      this.props.history.push('/dashboard');
      return toastr.success('Login Successful', 'Welcome to Referix');
    } else {
      toastr.error(
        'Authentication Failed',
        res.message,
        this.props.isMobile ? toastrOptions : {}
      );
    }
  };

  handleSignup = async values => {
    const res = await this.props.signup(values, sysParams.roles.company);
    if (res.success) {
      this.setState({
        toggle: !this.state.toggle
      });
      return toastr.success('Signup Successful', 'Please log in');
    } else {
      toastr.error(
        'Authentication Failed',
        res.message,
        this.props.isMobile ? toastrOptions : {}
      );
    }
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <HeaderComponent
        authenticated={this.props.authenticated}
        handleLogin={this.handleLogin}
        handleSignup={this.handleSignup}
        handleLogout={this.handleLogout}
        dialogClose={this.state.toggle}
      />
    );
  }
}

function mapStateToProps({ auth, responsive }) {
  return {
    authenticated: auth.authenticated,
    isMobile: responsive.isMobile
  };
}

export default connect(mapStateToProps, actions)(Header);
