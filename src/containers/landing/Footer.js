// module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlexView from 'react-flexview';
import { TermsAndConditionButton } from 'components/landing/Footer';
import { PrivacyPolicyButton } from 'components/landing/Footer';
import { CopyRightLogo } from 'components/landing/Footer';
// local imports
import * as actions from 'actions';

// style imports

const styles = {
  footer1_root: {
    height: 50,
    backgroundColor: '#EDEDFF'
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

      <FlexView
        id="footer_background"
        shrink
        style={styles.footer1_root}
        vAlignContent="center"
      >
        <FlexView basis="25%">
          <TermsAndConditionButton />
          <PrivacyPolicyButton />
        </FlexView>

        <CopyRightLogo />

        <FlexView basis="25%" />
      </FlexView>
    );
  }
}

function mapStateToProps({ responsive }) {
  return { isMobile: responsive.isMobile };
}
export default connect(mapStateToProps, actions)(Footer);
