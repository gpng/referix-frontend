// module imports
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  renderField,
  required,
  email
} from 'components/forms/FormFieldValidation';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

// local imports

// style imports

const styles = {
  button: {
    marginTop: 12
  }
};

let ProfileManagementForm = props => {
  const {handleSubmit, submitting, userDetails} = props;
  return (
    <form
      id="profile-management-form"
      className="form-horizontal"
      onSubmit={handleSubmit}
    >

      <FormControl fullWidth disabled>
         <InputLabel>Email</InputLabel>
         <Input id="name-disabled" value="testing@hotmail.com"/>
         <FormHelperText>Your Email Address</FormHelperText>
       </FormControl>

      <Field
        required
        id="change-password"
        name="current_password"
        label="Current Password"
        type="password"
        component={renderField}
        validate={[required]} // Make a call so to make sure current password is valid
      />
      <Field
        required
        id="change-password"
        name="new_password"
        label="New Password"
        type="password"
        component={renderField}
        validate={[required]} // Making sure not same as current password
      />
      <Field
        required
        id="change-password"
        name="confirm_new_password"
        label="Confirm New Password"
        type="password"
        component={renderField}
        validate={[required]} // Making sure same as the password above
      />
      <Button
        style={styles.button}
        variant="raised"
        color="primary"
        type="submit"
        onClick={this.handleSubmit}
        disabled={submitting}
      >
        Submit
      </Button>
    </form>
  );
};

ProfileManagementForm = reduxForm({
  // a unique name for the form
  form: 'profile_management'
})(ProfileManagementForm);

export default ProfileManagementForm;
