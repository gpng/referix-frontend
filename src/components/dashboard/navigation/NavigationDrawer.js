// module imports
import React from 'react';
import FlexView from 'react-flexview';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';

// local imports
import MaterialIcon from 'components/icons/MaterialIcon';
import sysParams from 'sys_params';
import logo from 'assets/images/logo_transparent.png';

// style imports

const drawerWidth = sysParams.constants.drawerWidth;
const appBarHeight = sysParams.constants.appBarHeight;

const styles = theme => ({
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
  drawerLink: {
    textDecoration: 'none',
    color: 'black'
  },
  logo: {
    height: '64px',
    width: '128px'
  },
  activeItem: {
    backgroundColor: '#ff4081'
  }
});

/**
 *
 * @param {function} onSubmitLogout
 * @param {function} onDrawerToggle
 * @param {array} navItems Array of items to be shown in drawer
 * @param {boolean} mobileOpen
 */
let NavigationDrawer = props => {
  const {
    classes,
    onSubmitLogout,
    onDrawerToggle,
    navItems,
    mobileOpen
  } = props;

  const renderNavItems = () => {
    let renderList = [];
    const routes = navItems;
    for (var i = 0; i < routes.length; i++) {
      renderList.push(
        <Link to={routes[i].path} key={i} className={classes.drawerLink}>
          <ListItem
            button
            onClick={onDrawerToggle}
            className={
              window.location.pathname === routes[i].path
                ? classes.activeItem
                : null
            }
          >
            <ListItemIcon>
              <MaterialIcon icon={routes[i].icon} />
            </ListItemIcon>
            <ListItemText primary={routes[i].label} />
          </ListItem>
        </Link>
      );
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
          <FlexView>
            <img src={logo} alt="referix-logo" className={classes.logo} />
            {/* <Typography variant="title" color="inherit">
              REFERIX
            </Typography> */}
          </FlexView>
        </Link>
      </FlexView>
      <Divider />
      <List>{renderNavItems()}</List>
      <Divider />
      <List>
        <ListItem button onClick={onSubmitLogout}>
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
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={onDrawerToggle}
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
          // hideBackdrop
          // disableEnforceFocus
          ModalProps={{
            hideBackdrop: true,
            disableEnforceFocus: true
          }}
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
};

export default withStyles(styles, { withTheme: true })(NavigationDrawer);
