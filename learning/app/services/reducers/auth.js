import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    LOGOUT,
} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    access: null,
    refresh: null,
    isAuthenticated: null,
    user:null,
    error: null
}

export default function(state = initialState, actions) {
    const {type, payload} = actions;
    
    switch(type) {
        case ACTIVATION_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            // await AsyncStorage.setItem('access', payload.access);
            // console.log(await AsyncStorage)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case ACTIVATION_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGOUT:
        case LOGIN_FAIL:
            // await AsyncStorage.removeItem('access');
            // await AsyncStorage.removeItem('refresh');
            return{
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                error: payload && payload.detail ? payload.detail : 'An error occurred'
            }
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                signupError: payload 
            };

        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }

        default:
            return state
    }
}
