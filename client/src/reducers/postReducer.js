import {ADD_POST, DELETE_POST, GET_POSTS, POST_LOADING} from "../actions/types";

const initailState = {
    posts: [],
    post: {},
    loading: false
};

export default function (state = initailState, action) {

    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default:
            return state;
    }
}