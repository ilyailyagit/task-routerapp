import { StyleSheet } from 'react-native'

import Fonts from "../../Themes/Fonts";
import Metrics from "../../Themes/Metrics";
import Colors from "../../Themes/Colors";

const headingsCommon = {
    marginLeft: Metrics.marginFifteen
}
export default StyleSheet.create({
    mainContainer: {

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: Metrics.marginFifteen
    },
    headerLeftContainer: {
        flex: 1,
    },
    folderHeading: {
        fontSize: Fonts.size.h5,
        fontFamily: Fonts.type.bold,
        ...headingsCommon
    },
    folderSubHeading: {
        fontSize: Fonts.size.input,
        fontFamily: Fonts.type.semiBold,
        ...headingsCommon,
        marginTop: Metrics.marginFifteen
    },
    folderItemContainer: {
        width: 150,
        backgroundColor: Colors.snow,
        marginRight: Metrics.marginFifteen,
        paddingBottom: Metrics.marginFifteen
    },
    folderHeader: {
        flexDirection: 'row',
        paddingVertical: Metrics.baseMargin,
        alignItems: 'center',
        backgroundColor: Colors.purple
    },
    folderImage: {
        width: 25,
        height: 25,
        marginHorizontal: Metrics.marginFifteen
    },
    folderName: {
        color: Colors.snow,
        fontSize: Fonts.size.input
    },
    tasksStatusText: {
        fontSize: Fonts.size.input,
        fontFamily: Fonts.type.semiBold,
        marginTop: Metrics.marginFifteen,
        paddingHorizontal: Metrics.baseMargin,
        textAlign: 'center'
    }
})
