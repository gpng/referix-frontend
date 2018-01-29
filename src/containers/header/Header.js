// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Modal from 'material-ui/Modal';
import FlexView from 'react-flexview';

// local imports
import * as actions from 'actions';

// style imports
const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    position: 'absolute',
    width: 8 * 50,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 8 * 4
  };
}

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <FlexView>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              style={styles.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <FlexView grow>
              <Typography type="title" color="inherit">
                Referix
              </Typography>
            </FlexView>
            <Button color="inherit" onClick={this.handleOpen}>
              Signup
            </Button>
            <Button color="inherit" onClick={this.handleOpen}>
              Login
            </Button>
          </Toolbar>
        </AppBar>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <FlexView style={getModalStyle()}>
            <Typography type="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography type="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </FlexView>
        </Modal>
      </FlexView>
    );
  }
}

export default connect(null, actions)(Header);
