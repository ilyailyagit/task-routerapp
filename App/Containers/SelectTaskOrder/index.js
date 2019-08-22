import styles from './styles'
import React, {Component} from 'react'
import {FlatList, SafeAreaView, View} from 'react-native'
import TaskItem from "../../Components/TaskItem";
import RoundedButton from "../../Components/RoundedButton";
import strings from "../../Constants/strings";
import {Actions} from "react-native-router-flux";

export default class SelectTaskOrder extends Component {

    renderTaskItem = ({item}) => {
        return <TaskItem item={item}/>
    }

    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <FlatList
                    data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]}
                    renderItem={this.renderTaskItem}
                    keyExtractor={item => String(item.id)}
                />
                <View style={styles.createRouteButtonContainer}>
                    <RoundedButton onPress={Actions.createRoute} text={strings.createRoute} />
                </View>
            </SafeAreaView>
        )
    }
}
