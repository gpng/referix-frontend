// module imports
import React from 'react';
import FlexView from 'react-flexview';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import Avatar from 'material-ui/Avatar';

// local imports

import sysParams from 'sys_params';

// style imports

const drawerWidth = sysParams.constants.drawerWidth;
const appBarHeight = sysParams.constants.appBarHeight;

const styles = theme => ({
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  appBar: {
    marginLeft: 0,
    width: '100%',
    height: appBarHeight,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    }
  }
});

/**
 *
 * @param {string} title
 * @param {string} name
 * @param {function} onDrawerToggle
 */
const NavigationAppBar = props => {
  const { title, name, onDrawerToggle, classes } = props;

  const renderAvatar = () => {
    if (name) {
      const displayName = name.toUpperCase();
      return (
        <FlexView vAlignContent="center">
          <Avatar style={{ marginRight: 4 }}>{displayName[0]}</Avatar>
          <Hidden smDown>{displayName}</Hidden>
        </FlexView>
      );
    }
    return null;
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <FlexView grow>
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </FlexView>
        {renderAvatar()}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(NavigationAppBar);
