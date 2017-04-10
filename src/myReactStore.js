/**
 * Created by ulicny on 07.04.2017.
 */

// simple custom redux store implementation

export const createMyStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () => {
        return state;
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener())
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners.filter((l)=>l !== listener);
        }
    }

    return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
    }
}
