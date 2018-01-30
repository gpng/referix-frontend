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

let SignupForm = props => {
  const { handleSubmit, submitting } = props;

  return (
    <form id="signupform" className="form-horizontal" onSubmit={handleSubmit}>
      <Field
        required
        icon="glyphicon glyphicon-user"
        id="signup-email"
        name="email"
        label="Email"
        type="email"
        component={renderField}
        validate={[required, email]}
      />
      <Field
        required
        icon="glyphicon glyphicon-user"
        id="signup-password"
        name="password"
        label="Password"
        type="password"
        component={renderField}
        validate={[required]}
      />
      <Field
        required
        icon="glyphicon glyphicon-user"
        id="signup-first-name"
        name="first_name"
        label="First Name"
        type="text"
        component={renderField}
        validate={[required]}
      />
      <Field
        required
        icon="glyphicon glyphicon-user"
        id="signup-last-name"
        name="last_name"
        label="Last Name"
        type="text"
        component={renderField}
        validate={[required]}
      />
      <Field
        icon="glyphicon glyphicon-user"
        id="signup-contact-number"
        name="contact_number"
        label="Contact Number"
        type="text"
        component={renderField}
      />
      <Button
        style={styles.button}
        raised
        color="primary"
        type="submit"
        onClick={this.handleSubmit}
        disabled={submitting}
      >
        Signup
      </Button>
    </form>
  );
};

SignupForm = reduxForm({
  // a unique name for the form
  form: 'signup'
})(SignupForm);

export default SignupForm;
