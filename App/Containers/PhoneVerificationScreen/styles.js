import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    enterPhone: {
        color: Colors.snow,
        textAlign: 'center',
        fontSize: Fonts.size.input,
        paddingVertical: Metrics.baseMargin,
    },
    enter4DigitPhone: {
        color: Colors.grayI,
        textAlign: 'center',
        fontSize: Fonts.size.medium,
        paddingVertical: Metrics.baseMargin,
    },
    codeInputContainer: {
        marginTop: 30
    },
    codeInput: {
        borderWidth: 1.5,
        borderRadius: 2.5,
        color: Colors.black,
        backgroundColor: Colors.snow,
        fontSize: Fonts.size.input
    },
    buttonContainer: {
        marginTop: Metrics.section
    },
    notReceivedCode: {
        textAlign: 'center',
        color: Colors.gray,
        fontSize: Fonts.size.regular,
        paddingVertical: Metrics.baseMargin
    },
    reSend: {
        color: Colors.snow,
        fontSize: Fonts.size.regular
    }
})
