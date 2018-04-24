import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// async
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    };
};

// async action
export const auth = (email, pw, isSignedUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: pw,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDOEhIyFORpOZxTQDtNyep9Mf-WzMZXGKs'
        if(!isSignedUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDOEhIyFORpOZxTQDtNyep9Mf-WzMZXGKs'
        }
        axios.post(url, authData)
        .then(res => {
            console.log(res);
            // calculate logout expiration time; new Date with arguements gives us a date with the date we passed as arguments 
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            // access original response due to axios
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

// checking sign in status for staying logged in on refresh ect
export const authCheckStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                // difference between expiration date and the current time in milliseconds
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};