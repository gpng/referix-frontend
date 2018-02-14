// module imports
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router';
import FlexView from 'react-flexview';
import ReduxToastr from 'react-redux-toastr';
import debounce from 'lodash/debounce';

// local imports
import * as actions from 'actions';
import Header from 'containers/landing/header/Header';
import Landing from 'containers/landing/Landing';
import Footer from 'containers/landing/Footer';
import DashboardRoot from 'containers/dashboard/DashboardRoot';

// style imports

class App extends Component {
  componentWillMount = () => {
    this.props.deviceWidthUpdated();
    window.addEventListener(
      'resize',
      debounce(this.props.deviceWidthUpdated, 200)
    );
  };

  componentWillUnmount = () => {
    window.removeEventListener(
      'resize',
      debounce(this.props.deviceWidthUpdated, 200)
    );
  };

  handleRedirect = () => {
    if (!this.props.authenticated) {
      return <Redirect from="*" to="/" />;
    }
  };

  render() {
    return (
      <FlexView grow>
        <BrowserRouter>
          <FlexView grow column>
            <Route exact path="/" component={Header} />
            <Route path="/dashboard" component={DashboardRoot} />
            <Switch>
              <Route exact path="/" component={Landing} />
              {this.handleRedirect()}
            </Switch>
            <Route exact path="/" component={Footer} />
          </FlexView>
        </BrowserRouter>
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
      </FlexView>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { authenticated: auth.authenticated };
};

export default connect(mapStateToProps, actions)(App);
