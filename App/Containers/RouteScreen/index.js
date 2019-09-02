import React, {Component} from 'react'
import {Dimensions, FlatList, SafeAreaView, StatusBar, View} from 'react-native'
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';

import styles from "./styles";
import CircleIcon from "../../Components/CircleIcon";
import ActionButtons from "../../Components/ActionButtons";
import {Actions} from "react-native-router-flux";
import SelectedRoute from "../../Components/SelectedRoute";
import CalendarItem from "../../Components/CalendarItem";
import ActionSheet from "react-native-actionsheet";
import strings from "../../Constants/strings";
import {Colors} from "../../Themes";
import RouteActions from "../../Redux/RouteRedux";
import UserActions from "../../Redux/UserRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";
import {MAPS_KEY} from "../../Lib/AppConstants";
import AnimatedAlert from "../../Components/AnimatedAlert";
import RNLocation from "react-native-location";
import LinearGradient from "react-native-linear-gradient";
import CurrentLocationMarker from "../../Components/CurrentLocationMarker";

const {width, height} = Dimensions.get('window');

const DefaultDelta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

class RouteScreen extends Component {
    constructor(props) {
        super(props)
        const {currentLocation, routes} = props
        StatusBar.setBackgroundColor(Colors.primaryColorI)
        this.state = {
            location: {},
            selectedRouteId: '',
            activeRoute: {}
        }
        this.mapView = null;
        this.activeRoute = false
    }

    async componentDidMount() {
        const {getAllRoutes} = this.props
        getAllRoutes({status: null})
        RNLocation.configure({
            distanceFilter: 1,
            androidProvider: "auto",
            interval: 1000, // Milliseconds
            fastestInterval: 1000, // Milliseconds
            maxWaitTime: 1000, // Milliseconds
        }).then(() => RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "fine",
                rationale: {
                    title: "Location permission",
                    message: "We use your location to show you real time direactions.",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        })).then(granted => {
            console.tron.warn(granted)
            if (granted) {
                console.tron.warn('in if.')
                this._startUpdatingLocation();
            } else {
                console.tron.warn('in else.')
            }
        });
    }

    onPressedRoutesActions = (index) => {
        const {selectedRouteId} = this.state
        const {updateRouteStatus, deleteRoute, getSpecificRoute} = this.props
        if (index === 0) {
            updateRouteStatus(selectedRouteId, {status: 'active'})
            getSpecificRoute(selectedRouteId)
        } else if (index === 1) {
            deleteRoute(selectedRouteId)
        }
    }

    onPressedRouteItem = (selectedRouteId) => {
        if (!this.activeRoute) {
            this.setState({selectedRouteId})
            this.RouteAction.show()
        }
    }

    renderRouteItem = ({item}) => {
        return <CalendarItem onPress={() => this.onPressedRouteItem(item.id)} item={item}/>
    }

    renderListHeaderComponent = (activeRoute) => {
        return <SelectedRoute item={activeRoute}/>
    }

    render() {
        const {fetching, fetchingTasks, routes = [], route = {}, currentLocation} = this.props
        let activeRoute = {}
        let tasksList = []
        const {selectedRouteId} = this.state
        const originLocation = {...currentLocation, ...DefaultDelta}
        let locationCoordinates = []
        let wayPoints = null
        if (!fetchingTasks) {
            const {id = '', tasks = []} = route || {}
            if (id.toString() === selectedRouteId.toString() && route.routeStatus === 'active') {
                this.activeRoute = true
                tasksList = tasks.map((item) => item.task || {})
                activeRoute = routes[0]
                locationCoordinates.push(currentLocation)
                locationCoordinates = tasksList.map((item) => {
                    const {locationCoordinates = []} = item || {}
                    const latlong = {latitude: locationCoordinates[0], longitude: locationCoordinates[1]}
                    return latlong
                })
                wayPoints = (locationCoordinates.length > 2) ? locationCoordinates.slice(1, -1) : null
            }
        }
        locationCoordinates = [currentLocation, ...locationCoordinates]
        return (
            <SafeAreaView style={styles.mainContainer}>
                <MapView
                    region={originLocation}
                    initialRegion={originLocation}
                    style={styles.mapContainer}
                    ref={c => this.mapView = c}
                >
                    {locationCoordinates.map((coordinate, index) =>
                        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate}/>
                    )}
                    <CurrentLocationMarker defaultLocation={currentLocation} isTracking={true} />
                    {(locationCoordinates.length >= 2) && (
                        <MapViewDirections
                            origin={locationCoordinates[0]}
                            destination={locationCoordinates[locationCoordinates.length - 1]}
                            waypoints={wayPoints}
                            apikey={MAPS_KEY}
                            strokeWidth={5}
                            strokeColor={Colors.red}
                            optimizeWaypoints={true}
                            onStart={(params) => {
                                console.tron.warn(`Started routing between "${params.origin}" and "${params.destination}"`);
                            }}
                            onReady={result => {
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 20),
                                        bottom: (height / 20),
                                        left: (width / 20),
                                        top: (height / 20),
                                    }
                                });
                            }}
                            onError={(errorMessage) => {
                                console.tron.warn(errorMessage)
                            }}
                        />
                    )}
                </MapView>
                <CircleIcon iconName='navigation' iconType='Feather' iconContainer={styles.navigationContainer}/>
                <CircleIcon onPress={() => {
                }} iconContainer={styles.locationContainer}/>
                <FlatList
                    data={this.activeRoute ? tasksList : routes}
                    style={styles.routeContainer}
                    renderItem={this.renderRouteItem}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<AnimatedAlert title={strings.noRouteFound}/>}
                    ListHeaderComponent={this.renderListHeaderComponent(activeRoute)}
                />
                <ActionButtons onPressActionButton1={Actions.createActivity}
                               onPressActionButton2={Actions.createRoute}/>
                <ActionSheet
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    title={strings.selectOption}
                    ref={o => this.RouteAction = o}
                    onPress={this.onPressedRoutesActions}
                    options={[strings.markActive, strings.delete, strings.cancel]}
                />
                <ProgressDialog hide={!fetching && !fetchingTasks}/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({route: {fetching, fetchingTasks, routes = [], route = {}}, user: {currentLocation}}) => {
    return {fetching, routes, route, currentLocation, fetchingTasks}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRoutes: (params) => dispatch(RouteActions.getRoutes(params)),
        deleteRoute: (routeId) => dispatch(RouteActions.deleteRoute(routeId)),
        getSpecificRoute: (routeId) => dispatch(RouteActions.getSpecificRoute(routeId)),
        updateRouteStatus: (routeId, params) => dispatch(RouteActions.updateRouteStatus(routeId, params)),
        getCurrentLocation: () => dispatch(UserActions.getCurrentLocation())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen)
