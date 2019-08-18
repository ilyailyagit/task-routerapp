import {Dimensions, Platform, NativeModules} from 'react-native'

const {width, height} = Dimensions.get('window')
const {StatusBarManager} = NativeModules;

// Used via Metrics.baseMargin
const metrics = {
    tabbarHeight: 55,
    marginHorizontal: 10,
    marginVertical: 10,
    marginFifteen: 15,
    section: 25,
    baseMargin: 10,
    smallMargin: 5,
    marginThirty: 30,
    fourty: 40,
    doubleSection: 50,
    seventy: 70,
    hundred: 100,
    hundredTwenty: 120,
    doubleBaseMargin: 20,
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT,
    buttonRadius: 4,
    marginSeven: 7,
    icons: {
        tiny: 15,
        small: 20,
        tabIcon: 25,
        medium: 30,
        large: 45,
        xl: 50
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 200
    }
}

export default metrics
