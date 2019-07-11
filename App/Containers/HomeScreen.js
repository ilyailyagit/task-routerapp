import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
// Styles
import styles from './Styles/HomeScreenStyles'
import RoundedButton from '../Components/RoundedButton'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Home Screen</Text>
        <RoundedButton onPress={Actions.tabbar} text={'Go To Tabs'} />
      </View>
    )
  }
}
