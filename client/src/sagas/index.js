import { all, fork } from "redux-saga/effects";
import axios from "axios";
import productSaga from "./product";
import userSaga from "./user";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        // fork, call(블럭되는 fork) : 제너레이터 함수 실행
        // fork : 비동기 함수 호출
        // call : 동기 함수 호출
        // all : 배열 안 동시 실행
        // take : 액션 감시, 일회용.. 그래서 while(true)와 사용! 하지만 동기적으로 동작
        // takeEvery : while(true){...take...} => takeEvery를 사용하여 비동기로 동작, 클릭 실수를 두번했을 때 두번 실행됨
        // takeLatest : 클릭 실수를 두번했을 때, 첫번째 클릭을 무시하고 마지막 클릭만(이미 완료된 것은 두고 다음 것을 실행, 하지만 완료되지 않은 것이 있으면 없애버림) !, 요청을 취소하는 것이 아니라 응답에서 취소하는 것임...**
        // throttle : 요청도 시간을 제한
        // put : redux의 dispatch 역할

        fork(userSaga),
        fork(productSaga),
    ]);
}
