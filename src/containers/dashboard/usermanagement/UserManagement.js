// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

// local imports
import * as actions from 'actions';
import CreateUser from 'containers/dashboard/usermanagement/CreateUser';

// style imports

class UserManagement extends Component {
  constructor() {
    super();
    this.state = { value: 0 };
  }

  handleSubmit = values => {
    console.log('submitttinggg', values);
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    return (
      <FlexView column grow>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Approve" />
            <Tab label="Create" />
          </Tabs>
        </AppBar>
        <FlexView grow>
          <SwipeableViews
            axis="x"
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
            style={{ width: '100%' }}
          >
            <FlexView>Approve account table</FlexView>
            <CreateUser />
          </SwipeableViews>
        </FlexView>
      </FlexView>
    );
  }
}

function mapStateToProps({ responsive }) {
  return { isMobile: responsive.isMobile };
}

export default connect(mapStateToProps, actions)(UserManagement);
