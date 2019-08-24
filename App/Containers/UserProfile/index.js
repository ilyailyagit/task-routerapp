import React, { Component } from "react";
import { Image } from "react-native";
import GradientView from "../../Components/GradientView";
import { Images } from "../../Themes";
import styles from "./styles";
import Input from "../../Components/Input";
import RoundedButton from "../../Components/RoundedButton";
import strings from "../../Constants/strings";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      userName: "",
      familyName: ""
    };
  }

  render() {
    const { firstName, userName, familyName } = this.state;
    return (
      <GradientView>
        <Image
          source={Images.avatar}
          defaultSource={Images.avatar}
          style={styles.userImage}
        />
        <Input
          value={firstName}
          label={strings.firstName}
          labelStyle={styles.inputLabel}
          styleOverride={styles.inputContainerMain}
          containerStyle={styles.inputContainer}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={firstName => {
            this.setState({ firstName });
          }}
        />
        <Input
          value={userName}
          label={strings.userName}
          labelStyle={styles.inputLabel}
          styleOverride={styles.inputContainerMain}
          containerStyle={styles.inputContainer}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={userName => {
            this.setState({ userName });
          }}
        />
        <Input
          value={familyName}
          label={strings.familyName}
          labelStyle={styles.inputLabel}
          styleOverride={styles.inputContainerMain}
          containerStyle={styles.inputContainer}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={familyName => {
            this.setState({ familyName });
          }}
        />
        <RoundedButton text={strings.edit}/>
      </GradientView>
    );
  }
}
