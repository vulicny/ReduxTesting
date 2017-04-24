/**
 * Created by ulicny on 23.04.2017.
 */

export const auth = (state = {
    isFetching: false,
    isAutheticated: false
}, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return Object.assign({}, state, {
                isFetching: true,
                isAutheticated: false,
                user: action.credentials
            });
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                isFetching: false,
                isAutheticated: true,
                errorMessage: ''

            });
        case 'LOGIN_FAILURE':
            return Object.assign({}, state, {
                isFetching: false,
                isAutheticated: false,
                errorMessage: action.errorMessage
            });
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, state, {
            isFetching: false,
            isAutheticated: false,
            errorMessage: ''
        });
        default:
            return state;
    }
};
