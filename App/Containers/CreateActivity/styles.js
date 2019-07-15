import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        padding: Metrics.baseMargin,
        backgroundColor: Colors.snow
    },

    locationContainer: {
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.offWhiteI,
        paddingVertical: Metrics.smallMargin
    },
    myLocationContainer: {
        flexDirection: 'row',
        marginVertical: Metrics.baseMargin,
    },
    label: {
        color: Colors.gray,
        fontSize: Fonts.size.regular,
        paddingBottom: Metrics.baseMargin
    },
    value: {
        flex: 1,
        color: Colors.black,
        fontSize: Fonts.size.regular,
        paddingLeft: Metrics.smallMargin
    },
    myLocation: {
        width: 25,
        fontSize: 22,
        color: Colors.gray
    }
})
