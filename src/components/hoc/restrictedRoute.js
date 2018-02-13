// module imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { validateAccess } from 'actions/utilities';

const restrictedRoute = (WrappedComponent, permissions) => {
  class AuthenticatedComponent extends Component {
    componentWillMount = () => {
      this.checkPermissions();
    };

    checkPermissions = () => {
      if (!validateAccess(permissions)) {
        this.props.history.push('/');
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(AuthenticatedComponent);
};

export default restrictedRoute;
