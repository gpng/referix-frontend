import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import * as actions from 'actions';
import ProfileManagementForm from 'components/forms/ProfileManagementForm';
import Typography from 'material-ui/Typography';

class ProfileManagement extends Component {
  constructor() {
    super();
    this.state = { userDetails: null };
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

  renderForm = () => {
    if (this.state.userDetails) {
      return <ProfileManagementForm userDetails={this.state.userDetails} />;
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
