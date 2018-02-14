// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FlexView from 'react-flexview';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';

// local imports
import * as actions from 'actions';
import MaterialIcon from 'components/icons/MaterialIcon';
import sysParams from 'sys_params';
import { getTitle, validateAccess } from 'actions/utilities';

// style imports

const drawerWidth = sysParams.constants.drawerWidth;
const appBarHeight = sysParams.constants.appBarHeight;

const styles = theme => ({
  menuButton: {
    marginRight: 8
  },
  drawerPaper: {
    backgroundColor: '#fafafafa',
    width: drawerWidth,
    height: '100%'
  },
  drawerHeader: {
    width: drawerWidth,
    height: appBarHeight
  },
  drawerRoot: { opacity: 0 },
  drawerModal: {
    width: drawerWidth
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  appBar: {
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  drawerLink: {
    textDecoration: 'none',
    color: 'black'
  }
});

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      mobileOpen: false,
      firstName: null
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleLogout = () => {
    this.props.logout();
  };

  renderTitle = () => {
    return getTitle(this.props.history.location.pathname);
  };

  renderAvatar = () => {
    if (this.state.firstName) {
      const firstName = this.state.firstName.toUpperCase();
      return (
        <FlexView vAlignContent="center">
          <Avatar style={{ marginRight: 4 }}>{firstName[0]}</Avatar>
          <Hidden smDown>{firstName}</Hidden>
        </FlexView>
      );
    }
    return null;
  };

  componentWillMount = async () => {
    if (validateAccess(sysParams.roles.recruiter + sysParams.roles.company)) {
      if (!this.props.user) {
        await this.props.getCurrentUser();
      }
      this.setState({
        firstName: this.props.user.first_name || this.props.user.company_name
      });
    } else if (validateAccess(sysParams.roles.admin)) {
      this.setState({ firstName: 'Admin' });
    }
  };

  render() {
    const { classes } = this.props;

    const renderNavItems = () => {
      const routes = sysParams.routes;
      const renderList = [];
      for (let i = 0; i < routes.length; i++) {
        if (validateAccess(routes[i].access)) {
          renderList.push(
            <Link to={routes[i].path} key={i} className={classes.drawerLink}>
              <ListItem button onClick={this.handleDrawerToggle}>
                <ListItemIcon>
                  <MaterialIcon icon={routes[i].icon} />
                </ListItemIcon>
                <ListItemText primary={routes[i].label} />
              </ListItem>
            </Link>
          );
        }
      }
      return renderList;
    };

    const drawer = (
      <FlexView column>
        <FlexView
          className={classes.drawerHeader}
          vAlignContent="center"
          hAlignContent="center"
        >
          <Link to="/" className={classes.drawerLink}>
            <Typography type="title" color="inherit">
              REFERIX
            </Typography>
          </Link>
        </FlexView>
        <Divider />
        <List>{renderNavItems()}</List>
        <Divider />
        <List>
          <ListItem button onClick={this.handleLogout}>
            <ListItemIcon>
              <MaterialIcon icon="ExitToApp" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </FlexView>
    );

    return (
      <FlexView>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <FlexView grow>
              <Typography type="title" color="inherit">
                {this.renderTitle()}
              </Typography>
            </FlexView>
            {this.renderAvatar()}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            open
            hideBackdrop
            disableEnforceFocus
            classes={{
              paper: classes.drawerPaper,
              modal: classes.drawerModal
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default withRouter(
  withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, actions)(Navigation)
  )
);
