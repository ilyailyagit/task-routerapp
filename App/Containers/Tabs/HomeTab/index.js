import React, {Component} from 'react'
import {
    Alert,
    SafeAreaView,
    ImageBackground,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Platform,
    PermissionsAndroid, Image,
    ScrollView
} from 'react-native'
import * as _ from 'lodash'

import styles from './styles'
import {ProgressDialog} from "../../../Components/ProgressDialog";
import images from "../../../Themes/Images";
import FamilyActions from "../../../Redux/FamilyRedux";
import {connect} from "react-redux";
import FamilyMember from "../../../Components/FamilyMember";
import {ADD_FAMILY_MEMBER_BUTTON_ID} from "../../../Lib/AppConstants";
import Colors from "../../../Themes/Colors";
import AddContacts from "../../../Components/AddContacts";
import ModalComponent from "../../../Components/ModalComponent";
import ContactsSectionList from "react-native-sectionlist-contacts";
import strings from "../../../Constants/strings";
import {showErrorMessage} from "../../../Lib/Utilities";
import CreateNewContact from "../../../Components/CreateNewContact";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Metrics from "../../../Themes/Metrics";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class HomeTab extends Component {

    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            showFamilyMembers: false,
            selectedContacts: [],
            showContactsList: false,
            showAddFamilyMember: false
        }
    }

    async componentDidMount() {
        if (Platform.OS === "android") {
            await this.requestContactPermissionAndroid();
            this.processData();
        } else {
            this.processData();
        }
    }

    componentWillReceiveProps({fetching: newFetching}) {
        const {showAddFamilyMember} = this.state
        if (!newFetching && newFetching !== this.props.fetching && showAddFamilyMember) {
            this.setState({showAddFamilyMember: false})
        }
    }

    requestContactPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            ]);
            if (
                granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
                this.setState({androidPermission: true});
                return true
            } else {
                Alert.alert("Permissions Denied. Please Grant Permissions.");
                await this.requestContactPermissionAndroid();
            }
        } catch (err) {
            console.error("Robot: ", err);
            return false
        }
    };

    componentWillMount() {
        const {fetchFamilyReq, user} = this.props
        if (user.familyId) {
            fetchFamilyReq(user.familyId)
        } else {
            showErrorMessage(strings.hasNoFamily)
        }
    }

    renderFamilyMember = ({item, index}) => {
        return (
            <FamilyMember item={item} onAddFamilyMember={this.onAddFamilyMember}/>
        )
    }

    onAddFamilyMember = () => {
        const {showAddFamilyMember} = this.state
        if (!showAddFamilyMember) {
            this.setState({showAddFamilyMember: true})
        }
    }

    onAddNewFamilyMember = (contact) => {
        const {family: {name} = {}, createFamilyReq} = this.props
        if (name && !_.isEmpty(contact) && createFamilyReq && typeof createFamilyReq === 'function') {
            createFamilyReq(name, [contact])
        }
    }

    onContactSelected = (contact) => {
        this.setState({contact, showContactsList: false})
    }

    onAddContact = (newContact) => {
        const {contact: stateContact, selectedContacts} = this.state
        const contact = !_.isEmpty(newContact) ? newContact : stateContact
        console.tron.warn({
            cond: !contact || _.isEmpty(contact),
            contact,
            newContact,
            stateContact
        })
        if (!contact || _.isEmpty(contact)) {
            Alert.alert('kinldy select a contact first')
            return
        }
        const prevIndex = selectedContacts.findIndex(item => item.phone === newContact.phone)
        if (prevIndex === -1) {
            this.setState({contact, selectedContacts: [contact, ...selectedContacts]})
        } else if (!_.isEqual(selectedContacts[prevIndex], contact)) {
            const newSelected = selectedContacts
            newSelected.splice(prevIndex, 1, contact)
            this.setState({contact, selectedContacts: newSelected})
        } else {
            Alert.alert(strings.contactAlreadyAdded)
        }
    }

    onSelectContact = () => {
        const {showContactsList} = this.state
        if (!showContactsList) {
            this.setState({showContactsList: true, contact: null})
        }
    }

    onEditContact = (contact) => {
        this.setState({contact, role: contact.role})
    }

    onDeleteContact = (contact) => {
        const {selectedContacts} = this.state
        const newSelectedContacts = selectedContacts.filter(item => !_.isEqual(item, contact))
        this.setState({selectedContacts: newSelectedContacts})
    }

    onHideContactList = () => {
        const {showContactsList} = this.state
        if (showContactsList) {
            this.setState({showContactsList: false})
        }
    }

    renderContactItem = (item, index, section) => {
        const {thumbnailPath = '', name = ''} = item
        return (
            <TouchableOpacity style={styles.contactItemRow} onPress={() => this.onContactSelected(item)}>
                {!!thumbnailPath ? <Image style={styles.thumbnail} source={{uri: thumbnailPath}}/> :
                    <View style={styles.thumbnail}>
                        <Text style={styles.initials}>{name.substring(0, 1)}</Text>
                    </View>}
                <Text style={styles.contactName}>{name}</Text>
            </TouchableOpacity>
        )
    }

    onCreateFamily = () => {
        const {familyName, selectedContacts} = this.state
        const {createFamilyReq} = this.props
        if (!familyName) {
            showErrorMessage(strings.familyNameEmpty)
            return
        }
        createFamilyReq(familyName, selectedContacts)
    }

    renderCurrentTask = () => {
        const { currentTask = {} } = this.props
        if (_.isEmpty(currentTask)) {
            return <Text style={styles.noTaskText}>{strings.noTaskPlanned}</Text>
        }
        // todo: render the task if exists.
    }

    onMarkTaskDone = () => {
        // todo: mark Task as Done
    }

    onIgnoreTask = () => {
        // todo: ignore current task
    }

    renderTaskActions = () => {
        return (
            <View style={styles.bottomActionsRow}>
                <TouchableOpacity style={styles.taskLeftActionBtn}
                                  activeOpacity={0.8}
                                  onPress={this.onMarkTaskDone}>
                    <Text style={styles.taskBtnText}>{strings.markDone}</Text>
                </TouchableOpacity>
                <View style={styles.taskMiddleBtn}>
                    <View style={styles.verticalActionSeperator}/>
                    <Text style={styles.tasksStatusText}>No Tasks for today</Text>
                    <View style={styles.verticalActionSeperator}/>
                </View>
                <TouchableOpacity style={styles.taskRightActionBtn}
                                  activeOpacity={0.8}
                                  onPress={this.onIgnoreTask}>
                    <Text style={styles.taskBtnText}>{strings.ignoreForNow}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {familyName, selectedContacts, showContactsList, contact, showAddFamilyMember} = this.state
        const {isSignup, family = {}, fetching, contacts} = this.props
        const {name, users = []} = family
        if (fetching) {
            return (
                <View style={styles.mainContainer}>
                    <ProgressDialog hasTabs/>
                </View>
            )
        }
        return (
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {
                        !_.isEmpty(family) ? <>
                            <ImageBackground style={styles.topHeaderImage}
                                             source={images.bg}>
                                <View style={styles.familyTitleContainer}>
                                    <View style={styles.userNameContainer}>
                                        <Text style={styles.familyName}>{name}</Text>
                                    </View>
                                </View>
                                <View style={styles.familyMembersContainer}>
                                    <FlatList data={[{id: ADD_FAMILY_MEMBER_BUTTON_ID}, ...users]}
                                              renderItem={this.renderFamilyMember} horizontal
                                              extraData={this.props.family}/>
                                </View>
                            </ImageBackground>
                            {
                                showAddFamilyMember ? <CreateNewContact contact={contact}
                                                                        headerText={strings.externalInvites}
                                                                        onAddContact={this.onAddNewFamilyMember}
                                                                        onCancel={() => this.setState({
                                                                            showAddFamilyMember: false,
                                                                            showContactsList: false
                                                                        })}
                                                                        onSelectContact={this.onSelectContact}/> : null
                            }
                        </> : <>
                            <ImageBackground style={[styles.topHeaderImage]}
                                             source={images.addFamily}>
                                <View style={styles.contentFlexEnd}>
                                    <Text style={styles.enterFamilyName}>Enter Your Family Name</Text>
                                    <View style={styles.familyNameInputContainer}>
                                        <TextInput value={familyName}
                                                   style={styles.familyNameInput}
                                                   placeholder={`Your's family`}
                                                   placeholderTextColor={Colors.snow}
                                                   onChangeText={familyName => this.setState({familyName})}/>
                                        <TouchableOpacity style={styles.goBtnContainer}
                                                          onPress={this.onCreateFamily}>
                                            <Text style={styles.goTxt}>GO</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                            <AddContacts selectedContacts={selectedContacts}
                                         onSelectContact={this.onSelectContact}
                                         contact={contact}
                                         onAddContact={this.onAddContact}
                                         onEditContact={this.onEditContact}
                                         onDeleteContact={this.onDeleteContact}
                                         onContactSelected={this.onContactSelected}/>
                        </>
                    }

                    <View style={styles.currentTaskContainer}>
                        <View style={styles.taskHeaderContainer}>
                            <Text style={styles.taskHeadingText}>{strings.tasks}</Text>
                        </View>
                        <View style={styles.currentTaskContent}>
                            {this.renderCurrentTask()}
                        </View>
                        <View>
                            {this.renderTaskActions()}
                        </View>

                    </View>

                </ScrollView>
                <ModalComponent isModalVisible={showContactsList}
                                closeModal={this.onHideContactList}>
                    <SafeAreaView style={{flex: 1, backgroundColor: Colors.snow}}>
                        <ContactsSectionList sectionListData={contacts} renderItem={this.renderContactItem}/>
                    </SafeAreaView>
                </ModalComponent>

                <ActionButton buttonColor={Colors.actionButton}
                              backdrop={<View style={styles.actionBtnBackdrop}/>}
                              buttonTextStyle={styles.plusText}>
                    <ActionButton.Item buttonColor={Colors.actionButton}
                                       title={strings.createTask}
                                       size={Metrics.doubleSection}
                                       textStyle={styles.buttonText}
                                       textContainerStyle={styles.textContainer}
                                       onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-create"
                              style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor={Colors.actionButton}
                                       title={strings.createRoute}
                                       size={Metrics.doubleSection}
                                       textStyle={styles.buttonText}
                                       textContainerStyle={styles.textContainer}
                                       onPress={() => {
                                       }}>
                        <MaterialIcons name="my-location"
                                       style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const mapStateToProps = ({config: {contacts = []} = {}, user: {user, isSignup}, family: {fetching, family}}) => {
    return {
        user, isSignup, fetching, family, contacts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFamilyReq: (familyId) => dispatch(FamilyActions.fetchFamily(familyId)),
        createFamilyReq: (familyName, invites) => dispatch(FamilyActions.createFamily(familyName, invites))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab)
