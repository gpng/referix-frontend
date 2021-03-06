import React, { Component } from "react";
import { connect } from "react-redux";
import FlexView from "react-flexview";
import * as actions from "actions";
import PasswordChangeForm from "components/forms/PasswordChangeForm";
import { toastr } from "react-redux-toastr";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: null
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
        <PasswordChangeForm
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
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, actions)(ChangePassword);
