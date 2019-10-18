import React, {Component} from 'react'
import {SafeAreaView, ScrollView, Text, View} from 'react-native'

import styles from "./styles";
import strings from "../../Constants/strings";
import SwitchButton from "../../Components/SwitchButton";
import CalendarDialog from "../../Components/CalendarDialog";
import SwitchButtonGroup from "../../Components/SwitchButtonGroup";
import FamilyActions from "../../Redux/FamilyRedux";
import {connect} from "react-redux";
import RNCalendarEvents from "react-native-calendar-events";
import PaymentDialog from "../../Components/PaymentDialog";

class SettingsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushNotification: true,
            showCalendarDialog: false,
            showPaymentDialog: false,
            calendars: {},
        }
    }

    componentDidMount() {
        const {user: {familyId = ''}, fetchFamilyReq} = this.props
        fetchFamilyReq(familyId)
        RNCalendarEvents.authorizeEventStore().then(() => {
            RNCalendarEvents.findCalendars().then((calendars) => {
                  this.setState({calendars})
            })
        })
    }

    render() {
        const {pushNotification, showCalendarDialog, calendars, showPaymentDialog} = this.state
        const {family: {users = {}}} = this.props
        const familyMembers = users.map((item) => {
            return {id: item.phone, value: item.name}
        })
        return (
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView>
                    <Text onPress={() => this.setState({showPaymentDialog: true})} style={styles.premiumVersion}>{strings.premiumVersion}</Text>
                    <SwitchButtonGroup type={'route'} groupSettingsLabel='Route' groupSettings={familyMembers}/>
                    <SwitchButtonGroup type={'calendar'} groupSettingsLabel='Calendar' groupSettings={familyMembers}/>
                    <SwitchButtonGroup type={'budget'} groupSettingsLabel='Budget' groupSettings={familyMembers}/>
                    <SwitchButton label='Push Notification' showBorder={false} checked={pushNotification}
                                  onChangeSetting={() => {
                                      this.setState({pushNotification: !pushNotification})
                                  }}/>
                    <Text style={styles.selectCalendar} onPress={() => {this.setState({showCalendarDialog: true})}}>{strings.selectCalendar}</Text>
                    <Text style={styles.termsText}>{strings.termsConditions}</Text>
                    <View style={styles.horizontalLine}/>
                    <Text style={styles.termsText}>{strings.aboutUs}</Text>
                </ScrollView>
                {showPaymentDialog && <PaymentDialog onClose={() => this.setState({showPaymentDialog: false})}/>}
                {showCalendarDialog && <CalendarDialog calendars={calendars} onDone={() => this.setState({showCalendarDialog: false})}/>}
            </SafeAreaView>
        )
    }
}


const mapStateToProps = ({
                             user: {user = {}} = {},
                             family: {fetching, family} = {},
                         }) => {
    return {
        fetching, family, user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFamilyReq: (familyId) => dispatch(FamilyActions.fetchFamily(familyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)



