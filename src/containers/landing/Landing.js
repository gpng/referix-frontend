// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

// local imports
import * as actions from 'actions';
import background from 'assets/images/landing_background.jpeg';

// style imports

const styles = {
  root: {
    height: 500,
    backgroundImage: 'url("' + background + '")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px'
  }
};

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <FlexView grow style={styles.root}>
        <FlexView basis="20%" />
        <FlexView basis="60%" vAlignContent="center" column>
          <Typography type="display3" style={{ color: 'white' }} gutterBottom>
            Recruit and Earn Today
          </Typography>
          <TextField
            placeholder="Search job listings by industry, function, location or more"
            style={styles.textFieldInput}
            fullWidth
            InputProps={{
              disableUnderline: true
            }}
          />
        </FlexView>
        <FlexView basis="20%" />
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, actions)(Landing);
