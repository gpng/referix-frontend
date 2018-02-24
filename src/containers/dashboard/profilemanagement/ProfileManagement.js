import React, { Component } from "react";
import { connect } from "react-redux";
import FlexView from "react-flexview";
import * as actions from "actions";
import ProfileManagementForm from "components/forms/ProfileManagementForm";
import Typography from "material-ui/Typography";
import { toastr } from "react-redux-toastr";

class ProfileManagement extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: null,
      currentPass: null,
      newPass: null,
      confirmnewPass: null
    };
  }

  componentWillMount = () => {
    this.getCurrentUser();
  };

  getCurrentUser = async () => {
    const res = await this.props.getCurrentUser();
    if (res.success) {
      this.setState({ userDetails: res.data[0] });
    }
  };

  handleSubmit = async values => {
    const res = await this.props.updatePassword(values);
    if (res.success) {
      return toastr.success("Profile Updated", "Password successfully changed");
    } else {
      toastr.error("Validation Failed", res.message);
    }
  };

  renderForm = () => {
    if (this.state.userDetails) {
      return (
        <ProfileManagementForm
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
        <Typography>Not working yet</Typography>
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, actions)(ProfileManagement);
