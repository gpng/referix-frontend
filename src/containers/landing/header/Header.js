// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';

// local imports
import * as actions from 'actions';
import sysParams from 'sys_params';
import CompanySignupForm from 'components/forms/CompanySignupForm';
import LoginForm from 'components/forms/LoginForm';

// style imports
const styles = {
  menuButton: {
    marginRight: 8
  }
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      anchorEl: null,
      form: null
    };
  }

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

  handleSubmit = async values => {
    let res;
    switch (this.state.form) {
      case 'login':
        res = await this.props.login(values);
        break;
      case 'signup':
        res = await this.props.signup(values, sysParams.roles.company);
        break;
      default:
        return { success: false };
    }
    if (res.success) {
      this.handleDialogClose();
      switch (this.state.form) {
        case 'login':
          this.props.history.push('/dashboard');
          return toastr.success('Login Successful', 'Welcome to Referix');
        case 'signup':
          return toastr.success('Signup Successful', 'Please log in');
        default:
          return null;
      }
    } else {
      toastr.error('Authentication Failed', res.message);
    }
  };

  handleLogout = () => {
    this.props.logout();
    this.handleDialogClose();
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
        return <LoginForm onSubmit={this.handleSubmit} />;
      case 'signup':
        return <CompanySignupForm onSubmit={this.handleSubmit} />;
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
            onClick={this.handleLogout}
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
            <MenuItem onClick={this.handleMenuClose && this.handleLogout}>
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

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default withMobileDialog()(connect(mapStateToProps, actions)(Header));
