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

const styles = {
  alt: 'Shen',
  sizes: {
    width: 400,
    height: 400
  }
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {}
    };
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  componentWillMount = () => {
    this.getCurrentUser();
  };

  forceUpdateHandler(){
   this.forceUpdate();
 };

  getCurrentUser = async () => {
    const res = await this.props.getCurrentUser();
    if (res.success) {
      this.setState({ userDetails: res.data[0] });
    }
  };

  handleSubmit = async values => {
    values = cleanObject(values);
    const res = await this.props.updateProfile(values);

    if (res.success) {
      return toastr.success('Profile Updated');
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
          forceUpdate={this.forceUpdateHandler}
        />
      );
    } else if (this.state.userDetails.role_id === sysParams.roles.company) {
      return (
        <CompanyProfileUpdateForm
          userDetails={this.state.userDetails}
          onSubmit={this.handleSubmit}
          forceUpdate={this.forceUpdateHandler}
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
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, actions)(Profile);
