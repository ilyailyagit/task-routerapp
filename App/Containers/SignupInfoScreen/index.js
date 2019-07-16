import {isEmpty} from 'ramda'
import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import {Image, TouchableOpacity, Keyboard, View, Text} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import i18n from 'i18n-js'
import styles from "./styles";
import I18n from "../../I18n";
import {Images} from "../../Themes";
import Input from "../../Components/Input";
import CheckBox from "../../Components/CheckBox";
import GradientView from "../../Components/GradientView";
import RoundedButton from '../../Components/RoundedButton'
import {handlePermissionError} from "../../Lib/Utilities";
import {imageOptions, photosPermissionTypes} from "../../Lib/AppConstants";

export default class SingupInfoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            imagePath: '',
            imageType: ''
        }
    }

    onImageActionPressed = (index) => {
        switch (index) {
            case 0:
                ImagePicker.openCamera(imageOptions).then(image => {
                    const {path: imagePath, mime: imageType} = image
                    if (imagePath) {
                        this.setState({imagePath, imageType})
                    }
                }).catch(err => {
                    handlePermissionError(photosPermissionTypes.CAMERA)
                })
                break
            case 1:
                ImagePicker.openPicker(imageOptions).then(image => {
                    const {path: imagePath, mime: imageType} = image
                    if (imagePath) {
                        this.setState({imagePath, imageType})
                    }
                }).catch(err => {
                    handlePermissionError(photosPermissionTypes.PHOTOS)
                })
                break
        }
    }
    showActionSheet = () => {
        Keyboard.dismiss()
        this.ImageSheet.show()
    }

    render() {
        const {firstName, lastName, userName, password, imagePath} = this.state
        const image = isEmpty(imagePath) ? Images.avatar : {uri: imagePath}
        return (
            <GradientView>
                <KeyboardAwareScrollView style={styles.mainContainer}
                                         showsVerticalScrollIndicator={false}>
                    <TouchableOpacity onPress={this.showActionSheet}>
                        <Image source={image} style={styles.profileImage}/>
                        <ActionSheet
                            ref={o => this.ImageSheet = o}
                            options={[I18n.t('captureImage'), I18n.t('selectFromGallery'), I18n.t('cancel')]}
                            cancelButtonIndex={2}
                            onPress={this.onImageActionPressed}
                        />
                    </TouchableOpacity>
                    <Input
                        value={firstName}
                        returnKeyType={'next'}
                        label={I18n.t('firstName')}
                        placeholder={I18n.t('firstName')}
                        onChangeText={(firstName) => this.setState({firstName})}
                        onSubmitEditing={() => this.lastName.focus()}
                    />
                    <Input
                        value={lastName}
                        returnKeyType={'next'}
                        label={I18n.t('lastName')}
                        placeholder={I18n.t('lastName')}
                        ref={ref => this.lastName = ref}
                        onChangeText={(lastName) => this.setState({lastName})}
                        onSubmitEditing={() => this.userName.focus()}
                    />
                    <Input
                        value={userName}
                        returnKeyType={'next'}
                        label={I18n.t('userName')}
                        placeholder={I18n.t('userName')}
                        ref={ref => this.userName = ref}
                        onChangeText={(userName) => this.setState({userName})}
                        onSubmitEditing={() => this.passwordRef.focus()}
                    />
                    <Input
                        password
                        value={password}
                        returnKeyType={'done'}
                        onSubmitEditing={() => {}}
                        label={I18n.t('password')}
                        ref={ref => this.passwordRef = ref}
                        placeholder={I18n.t('password')}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <View style={styles.termsConditionsContainer}>
                      <CheckBox/>
                      <Text style={styles.acceptTermsConditions}>{i18n.t('acceptTermsConditions')}</Text>
                    </View>
                    <RoundedButton
                        text={i18n.t('signUp')}
                        buttonContainer={styles.buttonContainer}
                        onPress={() => Actions.tabbar({type: 'reset'})}
                    />
                </KeyboardAwareScrollView>
            </GradientView>
        )
    }
}
