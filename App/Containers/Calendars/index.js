import React, {Component} from 'react';
import {Text, View} from 'react-native'
import CustomCalendar from "../../Components/CustomCalendar";
import {CalendarData} from "../../DummyData";
import CalendarItem from "../../Components/CalendarItem";

export default class Calendars extends Component {

    renderCalendarItem = (item) => {
        return <CalendarItem item={item}/>
    }

    render() {
        return <CustomCalendar renderItem={this.renderCalendarItem} items={CalendarData}/>
    }


}

