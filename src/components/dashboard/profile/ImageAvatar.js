import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import AddAPhotoIcon from "material-ui-icons/AddAPhoto";
import background from 'assets/images/SampleKoala.jpg';

const styles = {
  profile_avatar: {
    width: 200,
    height: 200,
    border: 0,
    objectFit: 'cover'

  }
};

class ProfileAvatars extends Component {

  render() {
    const { userFirstName, AvatarStyle, imageSource } = this.props;
  //    var AvatarName = userFirstName.toUpperCase();
    return (
      <Avatar style={styles.profile_avatar} src={background} />
    );
  }
}

export default ProfileAvatars;
