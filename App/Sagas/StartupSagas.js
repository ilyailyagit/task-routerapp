import {delay, put, select} from 'redux-saga/effects'
import UserActions from "../Redux/UserRedux";
import {Actions} from 'react-native-router-flux'

export function * startup (api) {
  yield delay(1000)
  const {user = {}} = yield select(state => (state.user))
  if (user) {
    yield put(UserActions.loginSuccess(user))
    Actions.tabbar({type: 'reset'})
  } else {
    Actions.login({type: 'reset'})
  }
}
