import i18n from 'i18n-js'
import React, {Component} from 'react'
import {Image, Text} from 'react-native'
import {Actions} from "react-native-router-flux";
import CodeInput from 'react-native-confirmation-code-input';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";
import RoundedButton from '../../Components/RoundedButton'
import GradientView from "../../Components/GradientView";
import {Colors, Images} from "../../Themes";

export default class PhoneVerificationScreen extends Component {

    render() {
        return (
            <GradientView>
                <KeyboardAwareScrollView style={styles.mainContainer}
                                         showsVerticalScrollIndicator={false}>
                    <Image source={Images.logo} style={styles.logo}/>
                    <Text style={styles.enterPhone}>{i18n.t('enterPhoneNumber')}</Text>
                    <Text style={styles.enter4DigitPhone}>{i18n.t('enter4DigitCode')}</Text>
                    <CodeInput
                        ref="codeInputRef2"
                        compareWithCode='1234'
                        activeColor={Colors.snow}
                        inactiveColor={Colors.gray}
                        autoFocus={true}
                        ignoreCase={true}
                        inputPosition='center'
                        space={4}
                        size={50}
                        codeLength={4}
                        onFulfill={(isValid) => {}}
                        containerStyle={styles.codeInputContainer}
                        codeInputStyle={styles.codeInput}
                    />
                    <Text style={styles.notReceivedCode}>{i18n.t('didNotGetCode')}<Text
                        style={styles.reSend}>{i18n.t('resend')}</Text></Text>
                    <RoundedButton onPress={Actions.profileInfo} buttonContainer={styles.buttonContainer} text={i18n.t('verifyNow')}/>
                </KeyboardAwareScrollView>
            </GradientView>
        )
    }
}
