// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
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

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(null, actions)(Header);
