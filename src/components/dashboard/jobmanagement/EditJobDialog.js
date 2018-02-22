// module imports
import React, { Component } from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  withMobileDialog
} from 'material-ui/Dialog';
import Close from 'material-ui-icons/Close';

// local imports
import PostJobForm from 'components/forms/PostJobForm';

// style imports

/**
 * @param {function} onSubmit Handles submission of new job form
 * @param {boolean} toggle Boolean toggle for closing dialog
 * @param {object} job Selected job for populating fields
 */
class PostJobDialog extends Component {
  constructor() {
    super();
    this.state = { open: false, toggle: false };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.toggle !== this.props.toggle) {
      this.handleToggle();
    }
  };

  render() {
    const { fullScreen, onSubmit, job } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle
          id="dialog-title"
          style={{ minWidth: fullScreen ? 0 : 400 }}
        >
          Post New Job
          <Close
            style={{
              float: 'right',
              cursor: 'pointer',
              marginTop: '-10px',
              marginRight: '-10px',
              width: '20px'
            }}
            onClick={this.handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <PostJobForm onSubmit={onSubmit} job={job} />
        </DialogContent>
      </Dialog>
    );
  }
}

export default withMobileDialog()(PostJobDialog);
