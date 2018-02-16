// module imports
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  renderField,
  required,
  email
} from 'components/forms/FormFieldValidation';
import Button from 'material-ui/Button';

// local imports

// style imports

const styles = {
  button: {
    marginTop: 12
  }
};

let AdminSignupForm = props => {
  const { handleSubmit, submitting } = props;

  return (
    <form
      id="company-signup-form"
      className="form-horizontal"
      onSubmit={handleSubmit}
    >
      <Field
        required
        id="signup-email"
        name="email"
        label="Email"
        type="email"
        component={renderField}
        validate={[required, email]}
      />
      <Field
        required
        id="signup-password"
        name="password"
        label="Password"
        type="password"
        component={renderField}
        validate={[required]}
      />
      <Button
        style={styles.button}
        variant="raised"
        color="primary"
        type="submit"
        onClick={this.handleSubmit}
        disabled={submitting}
      >
        Register Admin
      </Button>
    </form>
  );
};

AdminSignupForm = reduxForm({
  // a unique name for the form
  form: 'admin_signup'
})(AdminSignupForm);

export default AdminSignupForm;
