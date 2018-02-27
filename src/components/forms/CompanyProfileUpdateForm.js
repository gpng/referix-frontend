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

let CompanyProfileUpdateForm = props => {
  const { handleSubmit, submitting, userDetails } = props;
  return (
    <form
      id="profile-management-form"
      className="form-horizontal"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        fullWidth
        id="company-name"
        name="company_name"
        label="Company Name"
        defaultValue={userDetails.company_name}
        validate={[required]}
      />

      <TextField
        fullWidth
        id="company-size"
        name="company_size"
        label="Company Size"
        defaultValue={userDetails.company_size}
        validate={[required]}
      />

      <TextField
        fullWidth
        id="company-type"
        name="company_type"
        label="Company Type"
        defaultValue={userDetails.company_type}
        validate={[required]}
      />

      <TextField
        fullWidth
        id="company-website"
        name="company_website"
        label="Company Website"
        defaultValue={userDetails.company_website}
        validate={[required]}
      />

      <TextField
        fullWidth
        id="company-type"
        name="company_type"
        label="Company Type"
        defaultValue={userDetails.company_type}
        validate={[required]}
      />

      <TextField
        fullWidth
        id="company-about"
        name="company_about"
        label="Company About"
        defaultValue={userDetails.company_about}
        validate={[required]}
      />

      <TextField
        fullWidth
        id="company-contact-number"
        name="company_contact_number"
        label="Company Contact Number"
        defaultValue={userDetails.company_contact_number}
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

CompanyProfileUpdateForm = reduxForm({
  // a unique name for the form
  form: "company_profile_update"
})(CompanyProfileUpdateForm);

export default CompanyProfileUpdateForm;
