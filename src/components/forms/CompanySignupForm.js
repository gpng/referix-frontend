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

let CompanySignupForm = props => {
  const { handleSubmit, submitting } = props;

  return (
    <form
      id="company-signup-form"
      className="form-horizontal"
      onSubmit={handleSubmit}
    >
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
        id="signup-company-name"
        name="company_name"
        label="Company Name"
        type="text"
        component={renderField}
        validate={[required]}
      />
      <Button
        style={styles.button}
        raised
        color="primary"
        type="submit"
        onClick={this.handleSubmit}
        disabled={submitting}
      >
        Register Company
      </Button>
    </form>
  );
};

CompanySignupForm = reduxForm({
  // a unique name for the form
  form: 'company_signup'
})(CompanySignupForm);

export default CompanySignupForm;
