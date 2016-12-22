import axios from 'axios';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_SIGNUP,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';

/*============================================================================
    authentication
==============================================================================*/

/* 로그인 */
export function loginRequest(userId, password) {
    return (dispatch) => {
        // 로그인 API
        dispatch(login());

        // API REQUEST
        return axios.post('/api/account/signin', { userId, password })
        .then((response) => {
            // SUCCEED
            dispatch(loginSuccess(userId));
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure());
        });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(userId) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        userId
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* 회원가입 */
export function signUpRequest(userId, password) {
    return (dispatch) => {
        // 회원가입 API
        dispatch(signUp());

        // API REQUEST
        return axios.post('/api/account/signup', { userId, password })
        .then((response) => {
            dispatch(signUpSuccess());
        }).catch((error) => {
            dispatch(signUpFailure(error.response.data.code));
        });
    };
}

export function signUp() {
    return {
        type: AUTH_SIGNUP
    };
}

export function signUpSuccess() {
    return {
        type: AUTH_SIGNUP_SUCCESS,
    };
}

export function signUpFailure(error) {
    return {
        type: AUTH_SIGNUP_FAILURE,
        error
    };
}
/* 세션 상태 */
export function getStatusRequest() {
    return (dispatch) => {
        // 세션 정보 API
        dispatch(getStatus());

        // API REQUEST
        return axios.get('/api/account/getInfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.userId));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(userId) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        userId
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

/* 로그아웃 */
export function logoutRequest() {
    return (dispatch) => {

        //API REQUEST
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
