// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { toastr } from 'react-redux-toastr';
import Fuse from 'fuse.js';

// local imports
import * as actions from 'actions';
import DisplayJobCards from 'components/dashboard/jobmanagement/DisplayJobCards';
import SearchJobForm from 'components/forms/SearchJobForm';

// style imports

class JobSearch extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      selectedJob: null
    };
  }

  handleSubmit = async values => {
    this.setState({
      jobs: []
    });
    const res = await this.props.getJobs(values);
    if (res.success) {
      this.setState({
        jobs: values.search_job_text
          ? this.searchText(res.data, values.search_job_text)
          : res.data
      });
    } else {
      return toastr.error('Post Job Failed', res.message);
    }
  };

  /**
   * Fuzzy text search
   * @param {object[]} list
   * @param {string} searchText
   */
  searchText(list, text) {
    const options = {
      shouldSort: true,
      threshold: 0.0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'compensation_benefits',
        'job_sector',
        'job_skills',
        'job_title',
        'job_type',
        'salary',
        'years_of_experience'
      ]
    };
    const fuse = new Fuse(list, options); // "list" is the item array
    return fuse.search(text);
  }

  render() {
    return (
      <FlexView column grow>
        <SearchJobForm onSubmit={this.handleSubmit} />
        <DisplayJobCards jobs={this.state.jobs} />
      </FlexView>
    );
  }
}

export default connect(null, actions)(JobSearch);
