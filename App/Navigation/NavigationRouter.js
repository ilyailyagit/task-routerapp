// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Actions, Scene, Stack, Tabs, Router } from 'react-native-router-flux'
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers'
import styles from './Styles/NavigationContainerStyle'
import TabIcon from '../Components/TabIcon'
import HomeScreen from '../Containers/HomeScreen'
import TabScreen from '../Containers/TabScreen'
import CustomWebview from '../Components/CustomWebview'
import { Colors } from '../Themes'

export const navigationMiddleware = createReactNavigationReduxMiddleware(state => state.nav)

export const Routes = Actions.create(
  <Stack
    headerMode='screen'
    navigationBarStyle={styles.navBarStyle}
    titleStyle={styles.navBarTextScreens}
    backButtonTintColor={Colors.snow}>
    <Scene
      key='webView'
      url='https://www.google.com' // todo: change url according to your default
      component={CustomWebview}
      title='Webview'
      titleStyle={styles.navBarTextTabs}
    />
    <Scene
      initial
      key='home'
      component={HomeScreen}
      title='Home'
      titleStyle={styles.navBarTextTabs}
    />
    <Tabs
      key='tabbar'
      hideNavBar
      showLabel={false}
      tabBarPosition={'bottom'}
      tabBarStyle={styles.tabBar}
      titleStyle={styles.navBarTextTabs}
      tabStyle={styles.tabBarIcon}>
      <Scene
        iconName='md-home'
        key='tab1'
        icon={TabIcon}
        component={TabScreen}
        title={'Home'}
      />
      <Scene
        iconName='md-folder'
        key='tab2'
        icon={TabIcon}
        component={TabScreen}
        title={'Projects'}
      />
      <Scene
        iconName='md-notifications'
        key='tab3'
        icon={TabIcon}
        tabBarOnPress={this.getNotifications}
        component={TabScreen}
        title={'Notifications'}
      />
      <Scene
        iconName='md-menu'
        key='tab4'
        icon={TabIcon}
        component={TabScreen}
        title={'More'}
      />
    </Tabs>
  </Stack>
)

export const ReduxNavigator = createReduxContainer(Routes)
export default connect(state => ({state: state.nav}))(Router)
