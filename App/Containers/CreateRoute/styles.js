import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.snow
    },
    listContainer: {
        height: 360
    },
    routeName: {
        textAlign: 'center',
        color: Colors.snow,
        padding: Metrics.baseMargin,
        fontSize: Fonts.size.input,
        backgroundColor: Colors.primaryColorI,
    },
    createRouteButton: {
        padding: Metrics.baseMargin,
        backgroundColor: Colors.primaryColorI
    },
    createRouteText: {
        color: Colors.snow,
        textAlign: 'center',
        padding: Metrics.baseMargin,
        fontSize: Fonts.size.input,
    },
    calendarIcon: {
        fontSize: 20,
        color: Colors.frost,
        marginLeft: Metrics.baseMargin
    },
    dateRow: {
        flexDirection: 'row'
    },
    dateInput: {
        padding: 5
    },
    dateContainer: {
        width: 140,
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderBottomColor: Colors.frost,
        paddingVertical: Metrics.doubleBaseMargin
    },
    inputLabel: {
        padding: 0,
        color: Colors.black
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor
    },
    routeDataContainer: {
        padding: Metrics.marginFifteen
    }
})
