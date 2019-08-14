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
    PermissionsAndroid, Image
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

class HomeTab extends Component {

    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            showFamilyMembers: false,
            selectedContacts: [],
            showContactsList: false
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
            <FamilyMember item={item}/>
        )
    }

    onContactSelected = (contact) => {
        this.setState({ contact, showContactsList: false })
    }

    onAddContact = (newContact) => {
        const { contact: stateContact, selectedContacts } = this.state
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
            this.setState({ contact, selectedContacts: [contact, ...selectedContacts] })
        } else if(!_.isEqual(selectedContacts[prevIndex], contact)) {
            const newSelected = selectedContacts
            newSelected.splice(prevIndex, 1, contact)
            this.setState({ contact, selectedContacts: newSelected })
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
        this.setState({ contact, role: contact.role })
    }

    onDeleteContact = (contact) => {
        const { selectedContacts } = this.state
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
        const { thumbnailPath = '', name = '' } = item
        return (
            <TouchableOpacity style={styles.contactItemRow} onPress={() => this.onContactSelected(item)}>
                {!!thumbnailPath ? <Image style={styles.thumbnail} source={{uri: thumbnailPath}}/> : <View style={styles.thumbnail}>
                    <Text style={styles.initials}>{name.substring(0, 1)}</Text>
                </View>}
                <Text style={styles.contactName}>{name}</Text>
            </TouchableOpacity>
        )
    }

    onCreateFamily = () => {
        const { familyName, selectedContacts } = this.state
        const { createFamilyReq } = this.props
        if (!familyName) {
           showErrorMessage(strings.familyNameEmpty)
           return
        }
        createFamilyReq(familyName, selectedContacts)
    }

    render() {
        const {familyName, selectedContacts, showContactsList, contact} = this.state
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
                                     onContactSelected={this.onContactSelected} />
                    </>
                }
                <ModalComponent isModalVisible={showContactsList}
                                closeModal={this.onHideContactList}>
                    <SafeAreaView style={{flex: 1, backgroundColor: Colors.snow}}>
                        <ContactsSectionList sectionListData={contacts} renderItem={this.renderContactItem}/>
                    </SafeAreaView>
                </ModalComponent>
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
