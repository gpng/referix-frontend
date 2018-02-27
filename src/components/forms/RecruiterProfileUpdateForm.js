// module imports
import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField, required } from "components/forms/FormFieldValidation";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

// local imports

// style imports

const styles = {
  button: {
    marginTop: 12,
    marginLeft: 8
  }
};

let RecruiterProfileUpdateForm = props => {
  const { handleSubmit, submitting, userDetails } = props;
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

      <TextField
        required
        fullWidth
        id="first-name"
        name="first_name"
        label="First Name"
        defaultValue={userDetails.first_name}
        validate={[required]}
      />

      <TextField
        required
        fullWidth
        id="last-name"
        name="last_name"
        label="Last Name"
        defaultValue={userDetails.last_name}
        validate={[required]}
      />

      <TextField
        fullWidth
        id="contact-number"
        name="contact_number"
        label="Contact Number"
        defaultValue={userDetails.contact_number}
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
        Save
      </Button>
      <Button
        style={styles.button}
        variant="raised"
        color="primary"
        type="submit"
        // code in onclick will return to default
        disabled={submitting}
      >
        Cancel
      </Button>
    </form>
  );
};

RecruiterProfileUpdateForm = reduxForm({
  // a unique name for the form
  form: "recruiter_profile_update"
})(RecruiterProfileUpdateForm);

export default RecruiterProfileUpdateForm;
