import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
} from "../reducers/user";

function logInAPI(data) {
    // return axios.post("http://58.228.228.3/member/signIn", data);
    return "sndWEsfsDAFg23SF43";
}
function* logIn(action) {
    try {
        const x_auth_token = yield call(logInAPI, action.data);
        // console.log(result["headers"]);
        yield put({
            type: LOG_IN_SUCCESS,
            payload: x_auth_token,
            // payload: result["headers"]["x-auth-token"],
        });

        localStorage.setItem("x-auth-token", JSON.stringify(x_auth_token));
    } catch (error) {
        console.log(error);
        yield put({
            type: LOG_IN_FAILURE,
            error: error.response.data,
        });
    }
}

function registerAPI(data) {
    return axios.post("http://58.228.228.3/member/signUp", data);
}

function* register(action) {
    try {
        const result = yield call(registerAPI, action.data);
        yield put({
            type: REGISTER_SUCCESS,
            payload: result,
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: REGISTER_FAILURE,
            /*error: err.response.data*/
        });
    }
}

function logOutAPI() {
    return "로그아웃 성공";
}

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (error) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: error.response.data,
        });
    }
}

function loadUserAPI(userToken) {
    return {
        name: "현정",
        email: "9999@naver.com",
        isAdmin: true,
        phone: "01012341234",
        zipCode: "16213",
        address: "경기 수원시 장안구 가정빌라",
        detailAddress: "201호",
    };
}

function* loadUser(action) {
    try {
        const userInfo = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            payload: userInfo,
        });

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
        yield put({
            type: LOAD_USER_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchRegister() {
    yield takeLatest(REGISTER_REQUEST, register);
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchRegister),
        fork(watchLogout),
        fork(watchLoadUser),
    ]);
}
