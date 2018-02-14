// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import { MenuItem } from 'material-ui/Menu';
import Copyright from 'material-ui-icons/Copyright';
// local imports
import * as actions from 'actions';
import background from 'assets/images/landing_background.jpeg';

// style imports

const styles = {
  footer1_root: {
    height: 60,
    backgroundColor: '#EDEDFF'
  },

  copyright_icon: {
    width: 16,
    height: 16
  }
};

class Footer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      /* Footer on the left*/

      <FlexView id="footer_background" column style={styles.footer1_root}>
        <FlexView
          id="leftsection"
          basis="100%"
          vAlignContent="center"
          hAlignContent="left"
        >
          <MenuItem>
            <Typography type="body2" color="primary">
              Terms Of Service
            </Typography>
          </MenuItem>

          <MenuItem>
            <Typography type="body2" color="primary">
              Privacy Policy
            </Typography>
          </MenuItem>

          <FlexView
            id="middlesection"
            basis="50%"
            hAlignContent="center"
            vAlignContent="center"
          >
            <Copyright style={styles.copyright_icon} />

            <Typography
              type="body1"
              color="default"
              align="center"
              style={{ marginLeft: 6 }}
            >
              Referix 2018
            </Typography>
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }
}

function mapStateToProps({ responsive }) {
  return { isMobile: responsive.isMobile };
}
export default connect(mapStateToProps, actions)(Footer);
