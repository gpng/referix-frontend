// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';

// local imports
import * as actions from 'actions';

// style imports

const styles = {};

class SampleContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <FlexView>Sample Container</FlexView>;
  }
}

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, actions)(SampleContainer);
