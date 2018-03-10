// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import RecruiterProfileUpdateForm from 'components/forms/RecruiterProfileUpdateForm.js';
import CompanyProfileUpdateForm from 'components/forms//CompanyProfileUpdateForm.js';
import { toastr } from 'react-redux-toastr';
import ProfileAvatars from 'components/dashboard/profile/ImageAvatar.js';
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
const styles = {
  profile_root: {
    width: '100%'
  },
  profileform_root: {
    width: '100%',
    height: 200
  },
  avatar_root: {
    height: 200
  },

  imageavatar_size: {
    width: 200,
    height: 200
  }
};

/**
 * Container handling dashboard profile UI state and updates
 */
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      imgSource: 'assets/images/SampleKoala.jpg'
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

  renderAvatar = () => {
    return (
      <ProfileAvatars
        userFirstName={this.state.userDetails.first_name}
        style={styles.imageavatar_size}
        imageSource={this.state.imgSource}
      />
    );
  };

  render() {
    return (
      <FlexView style={styles.profile_root}>
        <FlexView
          basis="25%"
          vAlignContent="center"
          hAlignContent="center"
          style={styles.avatar_root}
        >
          {this.renderAvatar()}
        </FlexView>
        <FlexView basis="75%" style={styles.profileform_root}>
          {this.renderForm()}
        </FlexView>
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps, actions)(Profile);
