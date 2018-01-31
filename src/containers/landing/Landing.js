// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import ShowChart from 'material-ui-icons/ShowChart';
import AccessTime from 'material-ui-icons/AccessTime';
import People from 'material-ui-icons/People';

// local imports
import * as actions from 'actions';
import background from 'assets/images/landing_background.jpeg';

// style imports

const styles = {
  section1_root: {
    height: 500,
    backgroundImage: 'url("' + background + '")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  section1_textFieldInput: {
    borderRadius: 4,
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px'
  },
  section2_root: {
    backgroundColor: '#f7f7f7',
    paddingLeft: 72,
    paddingRight: 72,
    paddingTop: 36,
    paddingBottom: 36
  },
  section2_numberAvatar: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: '1px',
    backgroundColor: 'inherit',
    marginBottom: 16
  },
  section2_stepText: { marginTop: 12, width: '80%' },
  section3_root: {
    backgroundColor: 'white',
    paddingLeft: 72,
    paddingRight: 72,
    paddingTop: 36,
    paddingBottom: 36
  },
  section3_icons: { width: 64, height: 64 },
  section3_text: {
    width: '80%'
  }
};

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <FlexView column>
        {/* first section [START] */}
        <FlexView id="section1" style={styles.section1_root}>
          <FlexView basis="20%" />
          <FlexView basis="60%" vAlignContent="center" column>
            <Typography type="display3" style={{ color: 'white' }} gutterBottom>
              Recruit and Earn Today
            </Typography>
            <TextField
              placeholder="Search job listings by industry, function, location or more"
              style={styles.section1_textFieldInput}
              fullWidth
              InputProps={{
                disableUnderline: true
              }}
            />
          </FlexView>
          <FlexView basis="20%" />
        </FlexView>
        {/* first section [END] */}
        {/* second section [START] */}
        <FlexView id="section2" column shrink style={styles.section2_root}>
          <Typography type="display1" color="primary" align="center">
            It's Easy to Get Started
          </Typography>
          <FlexView style={{ marginTop: 24 }}>
            <FlexView column basis="33%">
              <Avatar style={styles.section2_numberAvatar}>
                <Typography type="title" color="primary">
                  1
                </Typography>
              </Avatar>
              <Typography type="title">Sign Up Online</Typography>
              <Typography type="body2" style={styles.section2_stepText}>
                Tell us a little about yourself and your experiences. We will be
                here every step of the way to guide you
              </Typography>
            </FlexView>
            <FlexView column basis="33%">
              <Avatar style={styles.section2_numberAvatar}>
                <Typography type="title" color="primary">
                  2
                </Typography>
              </Avatar>
              <Typography type="title">Share Some Documents</Typography>
              <Typography type="body2" style={styles.section2_stepText}>
                Just drop by to speak to one of our recruitment specialists and
                to submit necessary documents
              </Typography>
            </FlexView>
            <FlexView column basis="33%">
              <Avatar style={styles.section2_numberAvatar}>
                <Typography type="title" color="primary">
                  3
                </Typography>
              </Avatar>
              <Typography type="title">Start Recruiting</Typography>
              <Typography type="body2" style={styles.section2_stepText}>
                Pick up any job posting and start recommending your best
                candidates
              </Typography>
            </FlexView>
          </FlexView>
        </FlexView>
        {/* second section [END] */}
        {/* third section [START] */}
        <FlexView id="section3" column shrink style={styles.section3_root}>
          <Typography type="display1" color="primary" align="center">
            Why Recruit With Us?
          </Typography>
          <FlexView style={{ marginTop: 24 }}>
            <FlexView column basis="33%" hAlignContent="center">
              <ShowChart style={styles.section3_icons} />
              <Typography type="title" color="primary" align="center">
                EARN MORE
              </Typography>
              <Typography type="body2" color="primary" align="center">
                Boost your income today with our platform
              </Typography>
            </FlexView>
            <FlexView column basis="33%" hAlignContent="center">
              <AccessTime style={styles.section3_icons} />
              <Typography type="title" color="primary" align="center">
                24/7 RECRUITING
              </Typography>
              <Typography type="body2" color="primary" align="center">
                Recruit whenever it best suits your needs
              </Typography>
            </FlexView>
            <FlexView column basis="33%" hAlignContent="center">
              <People style={styles.section3_icons} />
              <Typography type="title" color="primary" align="center">
                EXPAND YOUR NETWORK
              </Typography>
              <Typography type="body2" color="primary" align="center">
                Meet new people and expand your network
              </Typography>
            </FlexView>
          </FlexView>
        </FlexView>
        {/* third section [END] */}
      </FlexView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, actions)(Landing);
