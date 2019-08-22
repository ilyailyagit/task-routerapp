import moment from "moment";
import React, {Component} from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";
import {FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Keyboard} from 'react-native'

import styles from "./styles";
import Input from "../../Components/Input";
import strings from "../../Constants/strings";
import VectorIcon from "../../Components/VectorIcon";
import CheckInItem from "../../Components/CheckInItem";
import RouteItem from "../../Components/RouteItem";
import {Actions} from "react-native-router-flux";

export default class CreateRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDatePicker: false,
            date: moment(),
            eventName: '',
            noOfEvents: '',
            selectedRoutes: []
        }
    }

    onSelectRoute = (routeId) => {
        let {selectedRoutes = []} = this.state
        if (selectedRoutes.includes(routeId)) {
            const index = selectedRoutes.findIndex((item) => item === routeId)
            selectedRoutes.splice(index, 1)
        } else {
            selectedRoutes.push(routeId)
        }
        this.setState({selectedRoutes})
    }

    renderRouteItem = ({item}) => {
        const {selectedRoutes} = this.state
        return <RouteItem item={item} selectedRoutes={selectedRoutes} onPress={() => this.onSelectRoute(item.id)}/>
    }

    renderRouteData = () => {
        const {date, eventName, noOfEvents} = this.state
        return (
            <View style={styles.routeDataContainer}>
                <Input
                    value={eventName}
                    label={strings.name}
                    labelStyle={styles.inputLabel}
                    containerStyle={styles.inputContainer}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    onChangeText={(eventName) => {
                        this.setState({eventName})
                    }}
                />
                <View style={styles.dateRow}>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => this.setState({showDatePicker: true})}>
                        <Text>Date</Text>
                        <View style={styles.dateContainer}>
                            <Text>{moment(date).format('MM/DD/YYYY')}</Text>
                            <VectorIcon name={'calendar'} type={'FontAwesome'} style={styles.calendarIcon}/>
                        </View>
                    </TouchableOpacity>
                    <Input
                        value={noOfEvents}
                        keyboardType={'numeric'}
                        label={strings.numberOfEvents}
                        labelStyle={styles.inputLabel}
                        containerStyle={styles.inputContainer}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        onChangeText={(noOfEvents) => this.setState({noOfEvents})}
                    />
                </View>
            </View>
        )
    }

    render() {
        const {showDatePicker} = this.state
        return (
            <SafeAreaView style={styles.mainContainer}>
                <FlatList
                    data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
                    renderItem={this.renderRouteItem}
                    keyExtractor={item => String(item.id)}
                />
                <Text style={styles.routeName}>{strings.routeName}</Text>
                {this.renderRouteData()}
                <TouchableOpacity style={styles.createRouteButton}>
                    <Text style={styles.createRouteText}>{strings.createRoute}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode='date'
                    is24Hour={false}
                    minimumDate={new Date()}
                    isVisible={showDatePicker}
                    onConfirm={(date) => this.setState({date, showDatePicker: false})}
                    onCancel={() => this.setState({showDatePicker: false})}
                />
            </SafeAreaView>
        )
    }
}
