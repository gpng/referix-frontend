// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import RecruiterProfileUpdateForm from 'components/forms/RecruiterProfileUpdateForm.js';
import CompanyProfileUpdateForm from 'components/forms//CompanyProfileUpdateForm.js';
import { toastr } from 'react-redux-toastr';

// local imports
import * as actions from 'actions';
import sysParams from 'sys_params';
import { cleanObject } from 'actions/utilities';

// const styles = {
//   alt: 'Shen',
//   sizes: {
//     width: 400,
//     height: 400
//   }
// };

/**
 * Container handling dashboard profile UI state and updates
 */
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {}
    };
  }

  componentWillMount = () => {
    this.getCurrentUser();
  };

  getCurrentUser = async () => {
    if (!this.props.user) {
      const res = await this.props.getCurrentUser();
      if (res.success) {
        return this.setState({ userDetails: this.props.user });
      }
    }
    return this.setState({ userDetails: this.props.user });
  };

  handleSubmit = async values => {
    values = cleanObject(values);
    const res = await this.props.updateProfile(values);

    if (res.success) {
      toastr.success('Profile Updated');
      return this.props.getCurrentUser();
    } else {
      toastr.error('Validation Failed', res.message);
    }
  };

  renderForm = () => {
    if (this.state.userDetails.role_id === sysParams.roles.recruiter) {
      return (
        <RecruiterProfileUpdateForm
          userDetails={this.state.userDetails}
          onSubmit={this.handleSubmit}
        />
      );
    } else if (this.state.userDetails.role_id === sysParams.roles.company) {
      return (
        <CompanyProfileUpdateForm
          userDetails={this.state.userDetails}
          onSubmit={this.handleSubmit}
        />
      );
    }
  };

  render() {
    return (
      <FlexView grow column style={{ padding: 8 }}>
        {this.renderForm()}
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps, actions)(Profile);
