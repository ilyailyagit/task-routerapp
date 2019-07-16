import React, {Component} from 'react'
import {Text, View, Image, Keyboard} from 'react-native'
// Styles
import RoundedButton from '../../Components/RoundedButton'
import GradientView from "../../Components/GradientView";
import i18n from 'i18n-js'
import styles from "./styles";
import {Images} from "../../Themes";
import Input from "../../Components/Input";
import I18n from "../../I18n";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Actions} from "react-native-router-flux";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    onLogin = () => {
        Keyboard.dismiss()
        let {username, password} = this.state
        Actions.tabbar({type: 'reset'})
    }

    render() {
        return (
            <GradientView>
                <KeyboardAwareScrollView style={styles.mainContainer}
                                         showsVerticalScrollIndicator={false}>
                    <Image source={Images.logo} style={styles.logo}/>

                    <Input
                        returnKeyType={'next'}
                        styleOverride={styles.input}
                        label={I18n.t('userName')}
                        placeholder={I18n.t('userName')}
                        onChangeText={(userName) => this.setState({userName})}
                        onSubmitEditing={() => this.passwordRef.focus()}
                    />
                    <Input
                        password
                        returnKeyType={'done'}
                        onSubmitEditing={() => {
                        }}
                        styleOverride={styles.input}
                        label={I18n.t('password')}
                        ref={ref => this.passwordRef = ref}
                        placeholder={I18n.t('password')}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <Text style={styles.alreadyAccount}>{i18n.t('forgotPassword')}<Text
                        style={styles.signIn}>{i18n.t('reset')}</Text></Text>

                    <RoundedButton
                        text={i18n.t('logIn')}
                        buttonContainer={styles.buttonContainer}
                        onPress={this.onLogin}
                    />
                    <Text style={styles.alreadyAccount}>{i18n.t('newUser')}<Text onPress={Actions.signup}
                                                                                 style={styles.signIn}>{i18n.t('signUp')}</Text></Text>
                </KeyboardAwareScrollView>
            </GradientView>
        )
    }
}
