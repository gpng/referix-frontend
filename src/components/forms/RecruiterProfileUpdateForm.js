// module imports
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, required } from 'components/forms/FormFieldValidation';
import Button from 'material-ui/Button';

// local imports

// style imports

const styles = {
  button: {
    marginTop: 12,
    marginLeft: 8
  }
};

/**
 * Update recruiter profile form
 * @param {object} userDetails Details to be initialized into form
 * @param {function} handleSubmit Submit form handler
 */
class RecruiterProfileUpdateForm extends Component {
  componentDidMount = () => {
    var requiredDetails = {
      first_name: this.props.userDetails.first_name,
      last_name: this.props.userDetails.last_name,
      contact_number: this.props.userDetails.contact_number
    };
    this.props.initialize(requiredDetails);
  };

  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props;
    return (
      <form
        id="profile-management-form"
        className="form-horizontal"
        onSubmit={handleSubmit}
      >
        {/* <FormControl fullWidth disabled>
        <InputLabel>Email</InputLabel>
        <Input id="name-disabled" value={userDetails.email} />
        <FormHelperText>Your Email Address</FormHelperText>
      </FormControl> */}
        <Field
          required
          fullWidth
          id="first-name"
          name="first_name"
          label="First Name"
          component={renderField}
          validate={[required]}
        />

        <Field
          required
          fullWidth
          id="last-name"
          name="last_name"
          label="Last Name"
          component={renderField}
          validate={[required]}
        />

        <Field
          fullWidth
          required
          id="contact-number"
          name="contact_number"
          label="Contact Number"
          component={renderField}
        />
        <Button
          style={styles.button}
          variant="raised"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={pristine || submitting}
        >
          Save
        </Button>
        <Button
          style={styles.button}
          variant="raised"
          color="primary"
          type="button"
          onClick={reset}
          // code in onclick will return to default
          disabled={pristine || submitting}
        >
          Reset
        </Button>
      </form>
    );
  }
}

RecruiterProfileUpdateForm = reduxForm({
  // a unique name for the form
  form: 'recruiter_profile_update'
})(RecruiterProfileUpdateForm);

export default RecruiterProfileUpdateForm;
