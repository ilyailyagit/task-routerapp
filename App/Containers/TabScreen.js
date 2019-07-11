import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
// Styles
import styles from './Styles/TabScreenStyles'

export default class TabScreen extends Component {
  render () {
    const { title = 'Tab 1' } = this.props
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{title} Screen</Text>
        </ScrollView>
      </View>
    )
  }
}
