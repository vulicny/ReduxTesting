/**
 * Created by ulicny on 15.04.2017.
 */

const byId = (state = {}, action) => {

    if (action.response) {
        let newState = {
            ...state,
            ...action.response.entities.todos,
        };
        return newState;

    } else {
        return state;
    }

};

export default byId;
export const getTodo = (state, id) => state[id];
