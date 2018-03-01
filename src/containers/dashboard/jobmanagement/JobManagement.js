// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { toastr } from 'react-redux-toastr';
import orderBy from 'lodash/orderBy';

// local imports
import * as actions from 'actions';
import PostJobDialog from 'components/dashboard/jobmanagement/PostJobDialog';
import EditJobDialog from 'components/dashboard/jobmanagement/EditJobDialog';
import DisplayJobCards from 'components/dashboard/jobmanagement/DisplayJobCards';

// style imports

class JobManagement extends Component {
  constructor() {
    super();
    this.state = {
      postToggle: true,
      editToggle: true,
      jobs: [],
      selectedJob: null
    };
  }

  componentDidMount = () => {
    this.getUserJobs();
  };

  getUserJobs = async () => {
    const res = await this.props.getUserJobs();
    if (res.success) {
      this.setState({ jobs: orderBy(res.data, ['updated_at'], ['desc']) });
    }
  };

  handlePostSubmit = async values => {
    const res = await this.props.postJob(values);
    if (res.success) {
      this.handlePostToggle();
      this.getUserJobs();
      return toastr.success('Post Job', 'Job successfully posted');
    } else {
      return toastr.error('Post Job Failed', res.message);
    }
  };

  handleEditSubmit = async values => {
    const res = await this.props.putJob(values);
    if (res.success) {
      this.handleEditToggle();
      this.getUserJobs();
      return toastr.success('Edit Job', 'Job successfully updated');
    } else {
      return toastr.error('Edit Job Failed', res.message);
    }
  };

  handlePostToggle = () => {
    this.setState({ postToggle: !this.state.postToggle });
  };

  handleEditToggle = job => {
    this.setState({ selectedJob: job, editToggle: !this.state.editToggle });
  };

  render() {
    return (
      <FlexView column grow>
        <PostJobDialog
          onSubmit={this.handlePostSubmit}
          dialogClose={this.state.postToggle}
        />
        <EditJobDialog
          onSubmit={this.handleEditSubmit}
          toggle={this.state.editToggle}
          job={this.state.selectedJob}
        />
        <DisplayJobCards
          jobs={this.state.jobs}
          onOpenDialog={this.handleEditToggle}
        />
      </FlexView>
    );
  }
}

export default connect(null, actions)(JobManagement);
