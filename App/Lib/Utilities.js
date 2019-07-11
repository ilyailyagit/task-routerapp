// @flow

// Utility functions
import {Alert, NetInfo} from 'react-native'
import {Colors, Images} from '../Themes/'
import Snackbar from 'react-native-snackbar'
import * as _ from 'lodash'

let connectedCallbacks = []
export const registerConnectionChangeCB = (Callback) => {
  if (typeof Callback === 'function') {
    connectedCallbacks = _.unionBy(connectedCallbacks, [Callback])
  }
}
export const unRegisterConnectCb = (Callback) => {
  if (typeof Callback === 'function') {
    connectedCallbacks = connectedCallbacks.filter(item => !_.isEqual(item, Callback))
  }
}
export let isConnected = false

const updateConnected = ({type}) => {
  isConnected = (type !== 'NONE' && type !== 'none')
  for (const Cb of connectedCallbacks) {
    Cb(isConnected)
  }
  console.tron.log('Network Connection = ' + isConnected)
  console.log('Network Connection = ' + isConnected)
}

export const checkConnected = () => {
  NetInfo.getConnectionInfo().then(updateConnected)
  NetInfo.addEventListener('connectionChange', updateConnected)
}

// Correct Map URIs
export const showMessage = (message: string) => {
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_LONG,
    action: {
      title: 'OK',
      color: Colors.snow,
      onPress: () => {
      }
    }
  })
}
export const showMessageIndefinate = (message: string) => {
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_INDEFINITE,
    action: {
      title: 'OK',
      color: Colors.snow,
      onPress: () => {
      }
    }
  })
}

export const showErrorMessage = (error: any) => {
  if (typeof error === 'string' || error instanceof String) {
    showMessage(error)
  } else if (error && error.message) {
    showMessage(error.message)
  } else {
    showMessage('Something went wrong please try again')
  }
}

export const isValidEmail = (email: string) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const isValidPhoneNo = (phoneNo: string) => {
  var phoneRe = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
  return phoneRe.test(phoneNo)
}

export const setScheme = (url) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url
  }
  return url
}

export const getAddressString = (city, state, zipCode) => {
  return _.compact([city, state, zipCode]).join(', ')
}

export const formatAddress = (street1, street2, city, state, zipCode) => {
  return _.compact([street1, street2, city, state, zipCode]).join(', ')
}

const ccard = {
  'Visa': {
    separator: [4],
    regex: /^4[0-9]{15}$/,
    imgSource: Images.visaCard,
    limit: 16
  },
  'Diners Club': {
    separator: [4],
    regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    imgSource: Images.dinersCard,
    limit: 16
  },
  'MasterCard': {
    separator: [4],
    regex: /^5[1-5][0-9]{14}$/,
    imgSource: Images.masterCard,
    limit: 16
  },
  'Discover': {
    separator: [4],
    regex: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    imgSource: Images.discoverCard,
    limit: 16
  },
  'JCB': {
    separator: [4],
    regex: /^(?:2131|1800|35\d{3})\d{11}$/,
    imgSource: Images.jcbCard,
    limit: 14
  },
  'American Express': {
    separator: [4, 6, 5],
    regex: /^3[47][0-9]{13}$/,
    imgSource: Images.americanExpressCard,
    limit: 15
  }
}

export const cardTypes = () => {
  let a, b, c, d
  for (b = {}, a = c = 40; c <= 49; a = ++c) b[a] = 'Visa'
  for (a = d = 50; d <= 59; a = ++d) b[a] = 'MasterCard'
  return b[34] = b[37] = 'American Express', b[60] = b[62] = b[64] = b[65] = 'Discover', b[35] = 'JCB', b[30] = b[36] = b[38] = b[39] = 'Diners Club', b
}

export const cardProps = (brand, cardNumber, checkValid) => {
  let originalCard = null
  if (cardNumber) {
    originalCard = cardNumber.slice(0)
    originalCard = originalCard.trim()
    cardNumber = cardNumber.replace(/[^0-9]/g, '')
    cardNumber = cardNumber.trim()
    brand = cardTypes()[cardNumber.slice(0, 2)]
  }
  if (!brand) {
    brand = 'Unknown'
  }

  let card = ccard[brand]

  if (!card) {
    card = {
      imgSource: Images.defaultCard,
      separator: [4]
    }
  }

  if (checkValid) {
    return !cardNumber || (card.regex ? card.regex.test(cardNumber) : false)
  }

  let formatter = card.separator

  let retObj = {
    brand: brand,
    imgSource: card.imgSource
  }

  if (!cardNumber) {
    retObj.valid = true
    retObj.formated = ''
  } else {
    retObj.valid = card.regex ? card.regex.test(cardNumber) : false

    if (cardNumber.length >= card.limit) {
      retObj.formated = originalCard
    } else if (cardNumber.length > 4) {
      let formattedNumber = []
      let start = 0

      if (formatter.length > 1) {
        for (let index = 0; index < formatter.length; index++) {
          formattedNumber.push(cardNumber.slice(start, start + formatter[index]))
          start += formatter[index]
        }
      } else {
        while (start < cardNumber.length) {
          formattedNumber.push(cardNumber.slice(start, start + formatter[0]))
          start += formatter[0]
        }
      }
      retObj.formated = formattedNumber.join(' ')
    } else {
      retObj.formated = cardNumber
    }
  }

  return retObj
}

export const showAlertDialog = (title, message, okCallBack, cancelable = false) => {
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: okCallBack}
    ],
    { cancelable }
  )
}
