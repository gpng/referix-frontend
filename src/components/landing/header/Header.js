// module imports
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import Menu, { MenuItem } from 'material-ui/Menu';
import Dialog, {
  DialogContent,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';
import Close from 'material-ui-icons/Close';
import FlexView from 'react-flexview';
import { Link } from 'react-router-dom';

// local imports
import CompanySignupForm from 'components/forms/CompanySignupForm';
import LoginForm from 'components/forms/LoginForm';

// style imports
const styles = {
  menuButton: {
    marginRight: 8
  }
};

/**
 * @param {boolean} authenticated
 * @param {function} handleSubmit
 * @param {function} handleLogout
 * @param {boolean} dialogClose Used to toggle dialog after signup
 */
class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      anchorEl: null,
      form: null
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.dialogClose !== this.props.dialogClose) {
      this.handleDialogClose();
    }
  };

  handleDialogOpen = formName => {
    this.setState({ dialogOpen: true, form: formName });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  renderDialogTitle = () => {
    switch (this.state.form) {
      case 'login':
        return 'Log In';
      case 'signup':
        return 'Registration';
      default:
        return null;
    }
  };

  renderDialogContent = () => {
    switch (this.state.form) {
      case 'login':
        return <LoginForm onSubmit={this.props.handleLogin} />;
      case 'signup':
        return <CompanySignupForm onSubmit={this.props.handleSignup} />;
      default:
        return null;
    }
  };

  renderHeaderToolbar = () => {
    switch (this.props.authenticated) {
      case true:
        return [
          <Link
            to="/dashboard"
            style={{ textDecoration: 'none', color: 'white' }}
            key="toolbar-dashboard"
          >
            <Button color="inherit">Dashboard</Button>
          </Link>,
          <Button
            color="inherit"
            onClick={this.props.handleLogout}
            key="toolbar-logout"
          >
            Logout
          </Button>
        ];
      case false:
        return (
          <FlexView>
            <Button
              color="inherit"
              onClick={this.handleDialogOpen.bind(this, 'signup')}
            >
              Sign Up
            </Button>
            <Button
              color="inherit"
              onClick={this.handleDialogOpen.bind(this, 'login')}
            >
              Login
            </Button>
          </FlexView>
        );
      default:
        return null;
    }
  };

  renderHeaderMenu = () => {
    switch (this.props.authenticated) {
      case true:
        return (
          <FlexView column>
            <Link
              to="/dashboard"
              style={{ textDecoration: 'none', color: 'white' }}
              key="toolbar-dashboard"
            >
              <MenuItem>Dashboard</MenuItem>
            </Link>
            <MenuItem onClick={this.handleMenuClose && this.props.handleLogout}>
              Logout
            </MenuItem>
          </FlexView>
        );
      case false:
        return (
          <FlexView column>
            <MenuItem
              onClick={
                this.handleMenuClose &&
                this.handleDialogOpen.bind(this, 'login')
              }
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={
                this.handleMenuClose &&
                this.handleDialogOpen.bind(this, 'signup')
              }
            >
              Sign Up
            </MenuItem>
          </FlexView>
        );
      default:
        return null;
    }
  };

  render() {
    const { fullScreen } = this.props;
    const { anchorEl } = this.state;
    const openMenu = Boolean(anchorEl);

    return (
      <FlexView>
        <AppBar position="static">
          <Toolbar>
            <FlexView grow>
              <Typography type="title" color="inherit">
                Referix
              </Typography>
            </FlexView>
            <Hidden xsDown>{this.renderHeaderToolbar()}</Hidden>
            <Hidden smUp>
              <IconButton
                color="inherit"
                aria-label="Menu"
                style={styles.menuButton}
                onClick={this.handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={openMenu}
                onClick={this.handleMenuClose}
              >
                {this.renderHeaderMenu()}
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle style={{ minWidth: fullScreen ? 0 : 400 }}>
            {this.renderDialogTitle()}
            <Close
              style={{
                float: 'right',
                cursor: 'pointer',
                marginTop: '-10px',
                marginRight: '-10px',
                width: '20px'
              }}
              onClick={this.handleDialogClose}
            />
          </DialogTitle>
          <DialogContent>{this.renderDialogContent()}</DialogContent>
        </Dialog>
      </FlexView>
    );
  }
}

export default withMobileDialog()(HeaderComponent);
