import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import AddAPhotoIcon from "material-ui-icons/AddAPhoto";


const styles = {
  profile_avatar: {
    width: 200,
    height: 200
  }
};

class ProfileAvatars extends Component {

  render() {
    const { userFirstName, AvatarStyle, imageSource } = this.props;
  //    var AvatarName = userFirstName.toUpperCase();
    return (
      <Avatar style={styles.profile_avatar}>
      <AddAPhotoIcon/>
      </Avatar>
    );
  }
}

export default ProfileAvatars;
