import {call, put} from 'redux-saga/effects'
import RouteActions from '../Redux/RouteRedux'
import Api from '../Services/ApiCaller'
import {showMessage} from "../Lib/Utilities";
import strings from "../Constants/strings";
import {Actions} from "react-native-router-flux";

export function* onCreateRoute(api, {route}) {
    try {
        const {res} = yield call(Api.callServer, api.createRoute, route, true)
        const {isSuccess, error, data} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.createRouteSuccess(res.data))
            Actions.pop()
            showMessage(strings.newRouteCreated)
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.createRouteFailure(e.message))
        }
    } catch (e) {
        yield put(RouteActions.createRouteFailure(e.message))
    }
}


export function* onGetRoutes(api, {params}) {
    try {
        const {res} = yield call(Api.callServer, api.getRoutes, params, true)
        const {isSuccess, error, items = []} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.getRoutesSuccess(items))
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.getRoutesFailure(e.message))
        }
    } catch (e) {
        yield put(RouteActions.getRoutesFailure(e.message))
    }
}

export function* onUpdateRouteStatus(api, {routeId, params}) {
    try {
        const {res} = yield call(Api.callServer, api.updateRouteStatus, params, true, routeId)
        const {isSuccess, error, data = {}} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.updateRouteStatusSuccess(data))
            showMessage(strings.markedActive)
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.updateRouteStatusFailure(e.message))
        }
    } catch (e) {
        yield put(RouteActions.updateRouteStatusFailure(e.message))
    }
}

export function* onDeleteRoute(api, {routeId}) {
    try {
        const {res} = yield call(Api.callServer, api.deleteRoute, routeId, true)
        const {isSuccess, error, message= '', data = {}} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.deleteRouteSuccess(routeId))
            showMessage(message)
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.deleteRouteFailure(e.message))
        }
    } catch (e) {
        yield put(RouteActions.deleteRouteFailure(e.message))
    }
}

export function* onGetSpecificRoute(api, {routeId}) {
    try {
        const {res} = yield call(Api.callServer, api.getSpecificRoute, routeId, true)
        const {isSuccess, error, message= '', data = {}} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.getSpecificRouteSuccess(data))
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.getSpecificRouteFailure(e.message))
        }
    } catch (e) {
        yield put(RouteActions.getSpecificRouteFailure(e.message))
    }
}
