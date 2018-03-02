// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderField, required } from 'components/forms/FormFieldValidation';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import FlexView from 'react-flexview';

// local imports

// style imports

const styles = {
  button: {
    marginTop: 12
  },
  chip: {
    margin: 4
  }
};

class PostJobForm extends Component {
  constructor() {
    super();
    this.state = {
      txtChipValue: '',
      chipsValue: '',
      chipsArr: []
    };
  }

  componentDidMount = () => {
    if (this.props.job) {
      this.props.initialize(this.props.job);
      this.setState({
        chipsArr: this.props.job.compensation_benefits.split('|')
      });
      this.props.change(
        'compensation_benefits',
        this.props.job.compensation_benefits
      );
    }
  };

  handleChange = ev => {
    this.setState({
      txtChipValue: ev.target.value
    });
  };

  handleClick = () => {
    if (this.state.txtChipValue !== '') {
      let tempArr = this.state.chipsArr.slice();
      tempArr.push(this.state.txtChipValue);
      this.props.change('compensation_benefits', tempArr.join('|'));
      this.setState({
        chipsArr: tempArr,
        txtChipValue: ''
      });
    }
  };

  handleDelete = key => {
    let tempArr = this.state.chipsArr;
    tempArr.splice(key, 1);
    this.setState({
      chipsArr: tempArr
    });
    this.props.change('compensation_benefits', tempArr.join('|'));
  };

  handleKeyPress = ev => {
    console.log(ev.target);
    ev.preventDefault();
  };

  renderChips = () => {
    let chipsList = [];
    for (let i = 0; i < this.state.chipsArr.length; i++) {
      chipsList.push(
        <Chip
          key={i}
          style={styles.chip}
          label={this.state.chipsArr[i]}
          onDelete={this.handleDelete.bind(this, i)}
        />
      );
    }
    return chipsList;
  };

  render() {
    const { handleSubmit, submitting } = this.props;

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
        <FlexView grow>
          <FlexView grow>
            <TextField
              label="Compensation & Benefits"
              value={this.state.txtChipValue}
              onChange={this.handleChange}
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  this.handleClick(ev);
                }
              }}
            />
          </FlexView>
          <FlexView shrink>
            <Button
              variant="raised"
              onClick={this.handleClick}
              style={styles.button}
              fullWidth
            >
              Add
            </Button>
          </FlexView>
        </FlexView>
        <FlexView grow wrap>
          {this.renderChips()}
        </FlexView>
        <Hidden xsUp>
          <Field
            required
            id="postjob-compensation-benefits"
            name="compensation_benefits"
            label="Compensation & Benefits"
            type="text"
            component={renderField}
            validate={[required]}
          />
        </Hidden>
        <Button
          style={styles.button}
          variant="raised"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={submitting}
        >
          Post Job
        </Button>
      </form>
    );
  }
}

PostJobForm = reduxForm({
  // a unique name for the form
  form: 'post-job'
})(PostJobForm);

function mapStateToProps({ responsive }) {
  return { isMobile: responsive.isMobile };
}
export default connect(mapStateToProps, null)(PostJobForm);
