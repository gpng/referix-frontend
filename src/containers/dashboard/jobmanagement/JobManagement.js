// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { toastr } from 'react-redux-toastr';

// local imports
import * as actions from 'actions';
import PostJobDialog from 'components/dashboard/jobmanagement/PostJobDialog';

// style imports

class JobManagement extends Component {
  constructor() {
    super();
    this.state = { toggle: true };
  }

  handleSubmit = async values => {
    const res = await this.props.postJob(values);
    if (res.success) {
      this.handleToggle();
      return toastr.success('Post Job', 'Job successfully posted');
    } else {
      toastr.error('Post Job Failed', res.message);
    }
  };

  handleToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    return (
      <FlexView column grow>
        <PostJobDialog
          onSubmit={this.handleSubmit}
          dialogClose={this.state.toggle}
        />
      </FlexView>
    );
  }
}

export default connect(null, actions)(JobManagement);
