// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { toastr } from 'react-redux-toastr';

// local imports
import * as actions from 'actions';
import PostJobForm from 'components/forms/PostJobForm';

// style imports

class JobManagement extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit = async values => {
    const res = await this.props.postJob(values);
    if (res.success) {
      return toastr.success('Post Job', 'Job successfully posted');
    } else {
      toastr.error('Post Job Failed', res.message);
    }
  };

  render() {
    return (
      <FlexView column grow>
        <PostJobForm onSubmit={this.handleSubmit} />
      </FlexView>
    );
  }
}

export default connect(null, actions)(JobManagement);
