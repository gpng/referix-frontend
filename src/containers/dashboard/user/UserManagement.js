// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';

// local imports
import * as actions from 'actions';
import SignupForm from 'components/forms/SignupForm';

// style imports

class UserManagement extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount = () => {
    console.log(this.props.user);
  };

  handleSubmit = values => {
    console.log('submitttinggg', values);
  };

  render() {
    return (
      <FlexView column grow>
        <FlexView>
          USER MANAGEMENT ---- this should be viewable by admin ONLY
        </FlexView>
        <FlexView column>
          USER CREATION FORM HERE -- should be a seperate component
          <SignupForm onSubmit={this.handleSubmit} />
        </FlexView>
        <FlexView>
          This should be a table of pending users to be accepted
        </FlexView>
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps, actions)(UserManagement);
