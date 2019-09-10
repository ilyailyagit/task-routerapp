import React, {Component} from 'react'
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native'
import Colors from "../../Themes/Colors";
import strings from "../../Constants/strings";
import CurrentLocationMarker from "../CurrentLocationMarker";
import {Actions} from 'react-native-router-flux'
import RouteActions from '../../Redux/RouteRedux'
import {connect} from "react-redux";
import {ProgressDialog} from "../ProgressDialog";
import {showMessage, TASK_STATUSES} from "../../Lib/Utilities";
import {Fonts} from "../../Themes";
import openMap from 'react-native-open-maps';

const DefaultNavigationDelta = {
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
}

const {width, height} = Dimensions.get('window');

class NavigationToTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskInProgress: true,
        }
    }

    componentDidMount(){
        const {currentLocation, nextTask, nextRouteId} = this.props
        const {task: {locationCoordinates = [0, 0]} = {}} = nextTask
        const destination = {latitude: locationCoordinates[0], longitude: locationCoordinates[1]}
        const mapUrl = {latitude: currentLocation.latitude, longitude: currentLocation.longitude, start: `${currentLocation.latitude},${currentLocation.longitude}`, end: `${destination.latitude},${destination.longitude}`}
        setTimeout(() => {
            showMessage(strings.navigationStarted)
            openMap(mapUrl)
        }, 1000)
    }


    render() {
        const {taskInProgress} = this.state
        const {currentLocation, nextTask, nextRouteId} = this.props
        const {task: {locationName: destinationName, name, id: taskID, locationCoordinates = [0, 0]} = {}} = nextTask
        const destination = {latitude: 30.275691, longitude: 70.728191}
        return (
            <View style={styles.mainContainer}>
                {taskInProgress && <Text style={styles.navInProgress}>{strings.navigationInProgress}</Text>}
                    <CurrentLocationMarker defaultLocation={currentLocation}
                                           isTracking={true}
                                           onArrived={() => {
                                               this.setState({taskInProgress: false})
                                               Alert.alert(
                                                   'Arrived',
                                                   'your destination has arrived. ',
                                                   [
                                                       {
                                                           text: 'Cancel',
                                                           onPress: () => Actions.tabbar({type: 'reset'}),
                                                           style: 'cancel',
                                                       },
                                                       {
                                                           text: 'Mark Done',
                                                           onPress: () => this.props.updateTaskStatusReq(nextTask.task.id, nextRouteId, TASK_STATUSES.COMPLETED)
                                                       },
                                                   ],
                                                   {cancelable: false},
                                               );
                                           }}
                                           destination={destination}/>
                <ProgressDialog hide={!this.props.fetching}/>
            </View>
        )
    }
}

const mapStateToProps = ({route: {fetching}, user: {currentLocation}}) => {
    return {
        currentLocation, fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskStatusReq: (taskId, routeId, status) => dispatch(RouteActions.updateTaskStatus(taskId, routeId, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationToTask)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.snow,
    },
    navInProgress: {
        color: Colors.gray,
        textAlign: 'center',
        fontSize: Fonts.size.h5
    }
})
