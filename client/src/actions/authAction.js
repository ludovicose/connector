import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registeruser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Login - Get User token
export const loginUser = (userData) => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const {token} = res.data;

            //Set tokent to ls
            localStorage.setItem("jwtToken", token);

            // Set token to Auth header
            setAuthToken(token);

            // Decode token to get user data
            const decode = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decode));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Set logged in user
export const setCurrentUser = (decode) => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    };
};
