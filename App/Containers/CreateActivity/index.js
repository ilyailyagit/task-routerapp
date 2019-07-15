import React, {Component} from 'react'
import RNGooglePlaces from 'react-native-google-places';
import {SafeAreaView, TouchableOpacity, Text, View} from 'react-native'
import Input from "../../Components/Input";
import styles from './styles'
import VectorIcon from "../../Components/VectorIcon";
// Styles

export default class CreateActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            location: 'Location'
        }
    }

    openPlacePicker = () => {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                console.tron.warn(place);
                this.setState({location: place.address || ''})
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    renderItem = (label, value) => {
        return (
            <TouchableOpacity onPress={this.openPlacePicker} style={styles.locationContainer}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.myLocationContainer}>
                    <Text style={styles.value}>{value}</Text>
                    <TouchableOpacity>
                        <VectorIcon name='my-location' type='MaterialIcons' style={styles.myLocation}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {name, location} = this.state
        return (
            <SafeAreaView style={styles.mainContainer}>
                <Input value={name} onChangeText={(name) => {
                    this.setState({name})
                }} lineInput label={'Name'} placeholder={'Name'}/>
                {/*<Input value={location} onChangeText={(location) => {this.setState({location})}}  onFocus={this.openPlacePicker} lineInput label={'Location'} placeholder={'Location'}/>*/}
                {this.renderItem('Location', location)}
            </SafeAreaView>
        )
    }
}
