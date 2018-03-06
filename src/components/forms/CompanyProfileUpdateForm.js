// module imports
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { renderField, required } from "components/forms/FormFieldValidation";
import Button from "material-ui/Button";

// local imports

// style imports

const styles = {
  button: {
    marginTop: 12,
    marginLeft: 8
  }
};

/**
 * Update company profile form
 * @param {object} userDetails Details to be initialized into form
 * @param {function} handleSubmit Submit form handler
 */
class CompanyProfileUpdateForm extends Component {
  componentDidMount = () => {
    var requiredDetails = {
      company_name: this.props.userDetails.company_name,
      company_size: this.props.userDetails.company_size,
      company_type: this.props.userDetails.company_type,
      company_website: this.props.userDetails.company_website,
      company_about: this.props.userDetails.company_about,
      company_contact_number: this.props.userDetails.company_contact_number,
      company_location: this.props.userDetails.company_location
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
        <Field
          required
          fullWidth
          id="company-name"
          name="company_name"
          label="Company Name"
          component={renderField}
          validate={[required]}
        />

        <Field
          fullWidth
          id="company-size"
          name="company_size"
          label="Company Size"
          component={renderField}
          validate={[required]}
        />

        <Field
          fullWidth
          id="company-type"
          name="company_type"
          label="Company Type"
          component={renderField}
          validate={[required]}
        />

        <Field
          fullWidth
          id="company-website"
          name="company_website"
          label="Company Website"
          component={renderField}
          validate={[required]}
        />

        <Field
          fullWidth
          id="company-about"
          name="company_about"
          label="Company About"
          component={renderField}
          validate={[required]}
        />

        <Field
          fullWidth
          id="company-location"
          name="company_location"
          label="Company Location"
          component={renderField}
          validate={[required]}
        />
        <Field
          fullWidth
          id="company-contact-number"
          name="company_contact_number"
          label="Company Contact Number"
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
          Save
        </Button>
        <Button
          style={styles.button}
          variant="raised"
          color="primary"
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

CompanyProfileUpdateForm = reduxForm({
  // a unique name for the form
  form: "company_profile_update"
})(CompanyProfileUpdateForm);

export default CompanyProfileUpdateForm;
