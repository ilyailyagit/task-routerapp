import PropTypes from 'prop-types'
import {View} from 'react-native'
import React, {Component} from 'react'

import styles from './styles'
import SwitchButton from "../SwitchButton";

export default class SwitchButtonGroup extends Component {
    static propTypes = {
        groupSettingsLabel: PropTypes.strings,
        groupSettings: PropTypes.array,
        type: PropTypes.strings
    }

    static defaultProps = {
        groupSettingsLabel: '',
        groupSettings: [],
        type: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            settingsStatus: false,
            settings: {
                route: {},
                budget: {},
                calendar: {}
            }
        }
    }

    componentDidMount() {
        const {groupSettings, type} = this.props
        const {settings} = this.state
        groupSettings.forEach((item) => {
            settings[type][item.id] = true
        })
        this.setState({settings})
    }

    onChangeSettings = (setting) => {
        const {type} = this.props
        const {settings} = this.state
        settings[type][setting.id] = !settings[type][setting.id]
        this.setState({settings})
    }

    render() {
        const {groupSettings, groupSettingsLabel, type} = this.props
        const {settingsStatus, settings} = this.state
        return (
            <View style={styles.mainContainer}>
                <SwitchButton label={groupSettingsLabel} isHeading checked={settingsStatus} onChangeSetting={() => {
                    this.setState({settingsStatus: !settingsStatus})
                }}/>
                {settingsStatus && groupSettings.map((setting)=> {
                    const currentSetting = settings[type][setting.id]
                    return <SwitchButton label={setting.value} checked={currentSetting} onChangeSetting={() => this.onChangeSettings(setting)}/>
                })}
            </View>
        )
    }
}
