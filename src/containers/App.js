// module imports
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import ReduxToastr from 'react-redux-toastr';

// local imports
import * as actions from 'actions';
import Header from 'containers/header/Header';

// style imports

class App extends Component {
  render() {
    return (
      <FlexView>
        <BrowserRouter>
          <FlexView>
            <Route path="/" component={Header} />
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
