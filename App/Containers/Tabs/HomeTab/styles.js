import { StyleSheet, Dimensions, Platform } from 'react-native'

import ApplicationStyles from "../../../Themes/ApplicationStyles";
import Metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import Fonts from "../../../Themes/Fonts";

const avatarSize = 50
export default StyleSheet.create({
    ...ApplicationStyles.screen,
    topHeaderImage: {
        width: Dimensions.get('window').width,
        height: 3 * Metrics.doubleSection,
        paddingHorizontal: Metrics.marginFifteen,
        paddingTop: Metrics.baseMargin
    },
    contentFlexEnd: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: Metrics.baseMargin
    },
    modalMainContainer: {
        margin: 0,
        padding: 0
    },
    userNameContainer: {
        height: Metrics.section,
        backgroundColor: Colors.semiTransBlack,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.semiTransBlack
    },
    familyTitleContainer: {
        flexDirection: 'row'
    },
    familyTxtContainer: {
      backgroundColor: Colors.halfSemiTransBlack
    },
    familyName: {
        color: Colors.snow,
        textAlignVertical: 'center',
        textAlign: 'center',
        margin: Metrics.smallMargin,
        fontFamily: Fonts.type.bold
    },
    familyTxt: {
        color: Colors.offWhite,
        fontFamily: Fonts.type.semiBold
    },
    familyMembersContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.baseMargin
    },
    enterFamilyName: {
        color: Colors.snow,
        fontSize: Fonts.size.regular,
        marginBottom: Metrics.baseMargin
    },
    familyNameInput: {
        minWidth: 170,
        color: Colors.snow,
        fontSize: Fonts.size.regular,
        borderBottomWidth: 1,
        borderBottomColor: Colors.snow,
        marginRight: Metrics.smallMargin,
        paddingHorizontal: Metrics.smallMargin,
        paddingBottom: Metrics.smallMargin
    },
    familyNameInputContainer: {
        flexDirection: 'row',
        marginTop: Metrics.baseMargin,
        alignItems: 'center',
    },
    goBtnContainer: {
        width: 70,
        height: 30,
        borderRadius: 35/2,
        overflow: 'hidden',
        backgroundColor: Colors.snow,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Metrics.smallMargin
    },
    goTxt: {
        color: Colors.themeColor,
        textAlignVertical: 'center',
        fontSize: Fonts.size.medium
    },
    contactItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Metrics.smallMargin,
        paddingHorizontal: Metrics.baseMargin
    },
    thumbnail: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize/2,
        overflow: 'hidden',
        marginHorizontal: Metrics.baseMargin,
        backgroundColor: Colors.offWhiteI,
        alignItems: 'center',
        justifyContent: 'center'
    },
    initials: {
        fontSize: Fonts.size.h5,
        color: Colors.themeColor,
        ...Platform.select({
            ios: {
                paddingTop: Metrics.marginSeven
            }
        })
    },
    contactName: {
        fontSize: Fonts.size.regular,
        ...Platform.select({
          ios: {
              paddingTop: Metrics.smallMargin
          }
        })
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    textContainer: {
        backgroundColor: Colors.transparent,
        shadowOpacity: 0,
        elevation: 0,
        ...Platform.select({
            ios: {
                paddingTop: Metrics.smallMargin,
            }
        })
    },
    plusText: {
        ...Platform.select({
            ios: {
                paddingTop: Metrics.baseMargin
            }
        }),
    },
    buttonText: {
        color: Colors.snow
    },
    actionBtnBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
})
