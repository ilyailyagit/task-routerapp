import i18n from 'i18n-js'
import React, {Component} from 'react'
import {Image, Text} from 'react-native'
import {Actions} from "react-native-router-flux";
import PhoneInput from 'react-native-phone-input'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";
import {Images} from "../../Themes";
import GradientView from "../../Components/GradientView";
import RoundedButton from '../../Components/RoundedButton'

export default class SignupScreen extends Component {

    render() {
        return (
            <GradientView>
                <KeyboardAwareScrollView style={styles.mainContainer}
                                         showsVerticalScrollIndicator={false}>
                    <Image source={Images.logo} style={styles.logo}/>
                    <Text style={styles.enterPhone}>{i18n.t('enterPhoneNumber')}</Text>
                    <PhoneInput textStyle={styles.phoneText} style={styles.phoneInput} ref='phone'/>
                    <RoundedButton onPress={Actions.verifyPhone} buttonContainer={styles.buttonContainer}
                                   text={i18n.t('signUp')}/>
                </KeyboardAwareScrollView>
            </GradientView>
        )
    }
}
