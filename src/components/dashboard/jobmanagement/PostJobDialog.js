// module imports
import React, { Component } from 'react';
import FlexView from 'react-flexview';
import Dialog, {
  DialogTitle,
  DialogContent,
  withMobileDialog
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Close from 'material-ui-icons/Close';

// local imports
import PostJobForm from 'components/forms/PostJobForm';

// style imports

/**
 * @param {function} onSubmit Handles submission of new job form
 * @param {boolean} dialogClose Boolean toggle for closing dialog
 */
class PostJobDialog extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.dialogClose !== this.props.dialogClose) {
      this.handleClose();
    }
  };

  render() {
    const { fullScreen, onSubmit } = this.props;
    return (
      <FlexView>
        <Button onClick={this.handleClickOpen} variant="raised" color="primary">
          Post New Job
        </Button>
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
            <PostJobForm onSubmit={onSubmit} />
          </DialogContent>
        </Dialog>
      </FlexView>
    );
  }
}

export default withMobileDialog()(PostJobDialog);
