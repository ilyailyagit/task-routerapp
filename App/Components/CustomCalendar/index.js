import styles from './styles'
import PropTypes from 'prop-types'
import {Agenda} from 'react-native-calendars'
import Colors from '../../Themes/Colors'
import React, {Component} from 'react'
import {View} from 'react-native'

export default class AgendaCalendar extends Component {
    static propTypes = {
        items: PropTypes.object,
        renderItem: PropTypes.function,
        loadItems: PropTypes.function,
        hideDot: PropTypes.boolean,
        isCalendarShown: PropTypes.function,
        renderEmptyData: PropTypes.function
    }

    static defaultProps = {
        items: {},
        refreshing: false,
        hideDot: false,
    }

    render () {
        const {items, renderItem, renderEmptyData} = this.props
        return (
            <Agenda
                items={items}
                selected={new Date()}
                renderItem={renderItem}
                renderKnob={this.renderKnob}
                renderDay={this.renderDay}
                rowHasChanged={this.rowHasChanged}
                renderEmptyDate={<View/>}
                renderEmptyDay={<View/>}
                theme={{
                    dayTextColor: Colors.black,
                    weekTextColor: Colors.black,
                    textMonthFontWeight: 'bold',
                    todayTextColor: Colors.black,
                    monthTextColor: Colors.black,
                    backgroundColor: Colors.snow,
                    agendaKnobColor: Colors.frost,
                    selectedDayTextColor: Colors.snow,
                    textSectionTitleColor: Colors.black,
                    agendaDayNumColor: Colors.darkgray,
                    agendaTodayColor: Colors.black,
                    agendaDayTextColor: Colors.gray,
                    calendarBackground: Colors.snow,
                    selectedDayBackgroundColor: Colors.themeColor,
                    dotColor: Colors.themeColor,
                    selectedDotColor: Colors.transparent
                }}
            />)
    }

    renderKnob = () => {
        return (
            <View style={styles.knobContainer}>
                <View style={styles.knob} />
            </View>
        )
    }

    renderEmptyDate = () => {
        return (
            <View/>
        )
    }

    rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name
    }

    renderDay = (day) => {
    }
}
