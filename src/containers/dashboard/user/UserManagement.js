// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';

// local imports
import * as actions from 'actions';

// style imports

class UserManagement extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount = () => {
    console.log(this.props.user);
  };

  render() {
    return (
      <FlexView column grow>
        <FlexView>
          USER MANAGEMENT ---- this should be viewable by admin ONLY
        </FlexView>
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps, actions)(UserManagement);
