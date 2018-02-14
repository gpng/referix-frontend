// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { toastr } from 'react-redux-toastr';

// local imports
import * as actions from 'actions';
import sysParams from 'sys_params';
import CompanySignupForm from 'components/forms/CompanySignupForm';
import RecruiterSignupForm from 'components/forms/RecruiterSignupForm';
import AdminSignupForm from 'components/forms/AdminSignupForm';

// style imports

const roles = sysParams.roles;

class CreateUser extends Component {
  constructor() {
    super();
    this.state = { role: '' };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async values => {
    const res = await this.props.signup(values, this.state.role);
    if (res.success) {
      return toastr.success('Registration', 'User successfully created');
    } else {
      toastr.error('Registration Failed', res.message);
    }
  };

  renderForm = () => {
    switch (this.state.role) {
      case roles.admin:
        return <AdminSignupForm onSubmit={this.handleSubmit} />;
      case roles.recruiter:
        return <RecruiterSignupForm onSubmit={this.handleSubmit} />;
      case roles.company:
        return <CompanySignupForm onSubmit={this.handleSubmit} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <FlexView grow column style={{ padding: 8 }}>
        <InputLabel htmlFor="input-role" autoComplete="off">
          Role
        </InputLabel>
        <Select
          value={this.state.role}
          inputProps={{ name: 'role', id: 'input-role' }}
          onChange={this.handleChange}
          style={{ width: 200 }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={roles.admin}>Admin</MenuItem>
          <MenuItem value={roles.recruiter}>Recruiter</MenuItem>
          <MenuItem value={roles.company}>Company</MenuItem>
        </Select>
        {this.renderForm()}
      </FlexView>
    );
  }
}

export default connect(null, actions)(CreateUser);
