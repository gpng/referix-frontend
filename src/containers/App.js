// module imports
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import ReduxToastr from 'react-redux-toastr';

// local imports
import * as actions from 'actions';
import Header from 'containers/header/Header';
import Landing from 'containers/landing/Landing';

// style imports

class App extends Component {
  componentWillMount() {
    this.props.deviceWidthUpdated();
    window.addEventListener('resize', this.props.deviceWidthUpdated);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.deviceWidthUpdated);
  }

  render() {
    return (
      <FlexView grow>
        <BrowserRouter>
          <FlexView grow column>
            <Route path="/" component={Header} />
            <Route exact path="/" component={Landing} />
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

export default connect(null, actions)(App);
