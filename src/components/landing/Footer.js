import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import FlexView from 'react-flexview';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Copyright from 'material-ui-icons/Copyright';

const styles = {

  copyright_icon: {
    width: 16,
    height: 16,
    justifyContent:"center" ,
    alignItems:"center"
  }
};

/**
 * Dialog content can be scrollable.
 */
export class TermsAndConditionButton extends React.Component {
  state = {
     open: false,
   };

   handleClickOpen = () => {
     this.setState({ open: true });
   };

   handleClose = () => {
     this.setState({ open: false });
   };
  render() {

    return (

        <FlexView >
        <MenuItem onClick={this.handleClickOpen}>
          <Typography type="body2" color="primary">
            Terms Of Service
          </Typography>
        </MenuItem>

                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <DialogTitle id="Terms of Service">{"Terms Of Service"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText >
                    Testing Lols
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
          </FlexView>
    );
  }
}


export class PrivacyPolicyButton extends React.Component {
  state = {
     open: false,
   };

   handleClickOpen = () => {
     this.setState({ open: true });
   };

   handleClose = () => {
     this.setState({ open: false });
   };

  render() {

    return (

        <FlexView >
        <MenuItem onClick={this.handleClickOpen}>
          <Typography type="body2" color="primary">
            Privacy Policy
          </Typography>
        </MenuItem>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <DialogTitle id="Terms of Service">{"Privacy Policy"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText >
                    Privacy Testing Lols :D
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
          </FlexView>
    );
  }
}


export class CopyRightLogo extends React.Component {

  render() {

    return (
        <FlexView basis="50%" hAlignContent="center" vAlignContent="center">
      <Copyright style={styles.copyright_icon}/>
      <Typography
        type="body1"
        color="default"
        style={{ marginLeft: 6}}
        align="center"
      >
        Referix 2018
      </Typography>
</FlexView>
    );
  }
}
