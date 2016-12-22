import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    },
    signup: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: '',
    }
};

export default function authentication(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {

        //로그인
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });

        //회원가입
        case types.AUTH_SIGNUP:
            return update(state, {
                signup: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_SIGNUP_SUCCESS:
            return update(state, {
                signup: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.AUTH_SIGNUP_FAILURE:
            return update(state, {
                signup: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });

        //세션정보
        case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true }
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    valid: { $set: true },
                    currentUser: { $set: action.userId }
                }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: { $set: false },
                    isLoggedIn: { $set: false }
                }
            });
        //로그아웃
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' }
                }
            });
        default:
            return state;
    }
}
