import React, {Component} from 'react'
import MapView from "react-native-maps";
import {View, AppState} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../Themes/Colors";
import RNLocation from "react-native-location";
import {ARRIVED_DISTANCE_THRESHOLD, getLatLonDiffInMeters} from "../../Lib/Utilities";

export default class CurrentLocationMarker extends Component {
    constructor(props) {
        super(props)
        const { defaultLocation = { latitude: 0, longitude: 0 } } = props
        this.state = {
            currentLocation: defaultLocation,
            appState: AppState.currentState,
            arrived: false
        }
    }

    async componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        RNLocation.configure({
            desiredAccuracy: {
                ios: "bestForNavigation",
                android: "highAccuracy"
            },
            allowsBackgroundLocationUpdates: true,
            distanceFilter: 0.01,
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
                    message: "We use your location to show you real time directions.",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        })).then(granted => {
            console.tron.warn(granted)
            if (granted) {
                this._startUpdatingLocation();
            } else {
            }
        });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if(this.state.arrived){
                this.props.onArrived()
            }
        }
        this.setState({appState: nextAppState});
    };

    _startUpdatingLocation = () => {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
            (locations) => {
                // console.tron.warn({locations})
                const {0: {longitude = 0, latitude = 0} = {}} = locations
                this.currentLocation = { latitude, longitude }
                this.setState({currentLocation: {latitude, longitude}}, () => {
                    if (this.trackingMarker && this.trackingMarker.redraw) {
                        this.trackingMarker.redraw()
                    }
                    const { destination } = this.props
                    const distance = getLatLonDiffInMeters(latitude, longitude, destination.latitude, destination.longitude);
                    console.tron.warn({distance})
                    if (Math.abs(distance)) {
                        if(distance <= ARRIVED_DISTANCE_THRESHOLD) {
                            this.setState({arrived: true})
                            this.props.onArrived()
                            this._stopUpdatingLocation()
                        }
                    }
                });
            }
        );
    };

    _stopUpdatingLocation = () => {
        this.locationSubscription && this.locationSubscription();
        // this.setState({ userCurrentLocation: null });
    };

    componentWillUnmount() {
        this._stopUpdatingLocation()
    }

    render() {
        const {currentLocation} = this.state
        const {isTracking} = this.props
        if (!isTracking) {
            return null
        }

        return  null
    }
}
