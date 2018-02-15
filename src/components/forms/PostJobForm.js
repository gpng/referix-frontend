// module imports
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, required } from 'components/forms/FormFieldValidation';
import Button from 'material-ui/Button';

// local imports

// style imports

const styles = {
  button: {
    marginTop: 12
  }
};

let PostJobForm = props => {
  const { handleSubmit, submitting } = props;

  return (
    <form
      id="post-job-form"
      className="form-horizontal"
      onSubmit={handleSubmit}
    >
      <Field
        required
        id="postjob-job-title"
        name="job_title"
        label="Job Title"
        type="text"
        component={renderField}
        validate={[required]}
      />
      <Field
        required
        id="postjob-job-type"
        name="job_type"
        label="Job Type"
        type="text"
        component={renderField}
        validate={[required]}
      />
      <Field
        required
        id="postjob-job-sector"
        name="job_sector"
        label="Job Sector"
        type="text"
        component={renderField}
        validate={[required]}
      />
      <Field
        required
        id="postjob-job-skills"
        name="job_skills"
        label="Job Skills"
        type="text"
        component={renderField}
        validate={[required]}
      />
      <Field
        required
        id="postjob-years-of-experience"
        name="years_of_experience"
        label="Years of Experience"
        type="number"
        component={renderField}
        validate={[required]}
      />
      <Field
        required
        id="postjob-salary"
        name="salary"
        label="Salary"
        type="text"
        component={renderField}
        validate={[required]}
      />
      <Field
        required
        id="postjob-compensation-benefits"
        name="compensation_benefits"
        label="Compensation & Benefits"
        type="text"
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
        Post Job
      </Button>
    </form>
  );
};

PostJobForm = reduxForm({
  // a unique name for the form
  form: 'post-job'
})(PostJobForm);

export default PostJobForm;
