import React, {Component} from 'react'
import {Dimensions, FlatList, SafeAreaView, StatusBar} from 'react-native'
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';

import styles from "./styles";
import {getCurrentGPSLocation} from "../../Lib/Utilities";
import CircleIcon from "../../Components/CircleIcon";
import ActionButtons from "../../Components/ActionButtons";
import {Actions} from "react-native-router-flux";
import SelectedRoute from "../../Components/SelectedRoute";
import CalendarItem from "../../Components/CalendarItem";
import ActionSheet from "react-native-actionsheet";
import strings from "../../Constants/strings";
import {Colors} from "../../Themes";
import RouteActions from "../../Redux/RouteRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";
import {MAPS_KEY} from "../../Lib/AppConstants";
import AnimatedAlert from "../../Components/AnimatedAlert";

const {width, height} = Dimensions.get('window');

const DefaultDelta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const tasksList = [
    {
        id: 317,
        order: 0,
        taskId: 2569,
        routeId: 142,
        status: 'active',
        name: 'Test Task 1',
        locationName: 'Test Location 1',
        createdAt: '2019-08-31T10:47:12.000Z',
        stepCoordinates: [30.191660, 70.734894],
        updatedAt: '2019 - 08 - 31T10:47:12.000Z'
    },
    {
        id: 317,
        order: 1,
        routeId: 142,
        taskId: 2568,
        status: 'inactive',
        name: 'Test Task 2',
        locationName: 'Test Location 2',
        createdAt: '2019-08-31T10:47:12.000Z',
        stepCoordinates: [30.047101, 70.647506],
        updatedAt: '2019 - 08 - 31T10:47:12.000Z'
    }]

class RouteScreen extends Component {
    constructor(props) {
        super(props)
        StatusBar.setBackgroundColor(Colors.primaryColorI)
        this.state = {
            location: {},
            selectedRouteId: '',
        }
        this.mapView = null;

    }

    componentDidMount() {
        this.locateCurrentLocation()
        const {getAllRoutes} = this.props
        getAllRoutes({status: 'active'})
    }

    locateCurrentLocation = () => {
        const location = getCurrentGPSLocation().then((location) => {
            this.setState({location})
        })
    }

    onPressedRoutesActions = (index) => {
        const {selectedRouteId} = this.state
        const {updateRouteStatus, deleteRoute, getSpecificRoute} = this.props
        if (index === 0) {
            getSpecificRoute(selectedRouteId)
            updateRouteStatus(selectedRouteId, {status: 'active'})
        } else if (index === 1) {
            deleteRoute(selectedRouteId)
        }
    }

    onPressedRouteItem = (selectedRouteId) => {
        this.setState({selectedRouteId})
        this.RouteAction.show()
    }

    renderRouteItem = ({item}) => {
        return <CalendarItem onPress={() => this.onPressedRouteItem(item.id)} item={item}/>
    }

    renderListHeaderComponent = (activeRoute) => {
        return <SelectedRoute item={activeRoute}/>
    }

    render() {
        const {fetching, routes = [], route = {}, currentLocation} = this.props
        let tasksRoutes = routes
        let activeRoute = {}
        const {selectedRouteId} = this.state
        const originLocation = {...currentLocation, ...DefaultDelta}

        let locationCoordinates = []
        const wayPoints = (locationCoordinates.length > 2) ? locationCoordinates.slice(1, -1) : null
        if (route.id.toString() === selectedRouteId.toString() && route.routeStatus === 'active') {
            tasksRoutes = tasksList || []
            activeRoute =  tasksList[0]
            locationCoordinates.push(currentLocation)
            locationCoordinates = tasksList.map((item) => {
                const {stepCoordinates} = item || {}
                const latlong = {latitude: stepCoordinates[0], longitude: stepCoordinates[1]}
                return latlong
            })
        }
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
                    {(locationCoordinates.length >= 2) && (
                        <MapViewDirections
                            origin={originLocation}
                            destination={locationCoordinates[locationCoordinates.length - 1]}
                            waypoints={wayPoints}
                            apikey={MAPS_KEY}
                            strokeWidth={3}
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
                <CircleIcon onPress={this.locateCurrentLocation} iconContainer={styles.locationContainer}/>
                <FlatList
                    data={tasksRoutes}
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
                <ProgressDialog hide={!fetching}/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({route: {fetching, routes = [], route = {}}, user: {currentLocation}}) => {
    return {fetching, routes, route, currentLocation}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRoutes: (params) => dispatch(RouteActions.getRoutes(params)),
        deleteRoute: (routeId) => dispatch(RouteActions.deleteRoute(routeId)),
        getSpecificRoute: (routeId) => dispatch(RouteActions.getSpecificRoute(routeId)),
        updateRouteStatus: (routeId, params) => dispatch(RouteActions.updateRouteStatus(routeId, params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen)
