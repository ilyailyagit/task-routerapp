import React, {Component} from 'react'
import {SafeAreaView} from 'react-native'
// Styles
import styles from './styles'
import LinearGradient from "react-native-linear-gradient";
import {Colors} from "../../Themes";

export default class GradientView extends Component {
    render () {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <LinearGradient start={{x: 0, y: 0.3}} end={{x: 0, y: 0.8}} colors={[Colors.primaryColor, Colors.primaryColorI]} style={styles.gradientContainer}>
                    {this.props.children}
                </LinearGradient>
            </SafeAreaView>
        )
    }
}
