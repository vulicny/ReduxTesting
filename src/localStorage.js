/**
 * Created by ulicny on 11.04.2017.
 */
//load state from localStorage
const loadState = () => {
    try {
        let serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

//save state to localStorage
const saveState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (err) {
        console.log(err);
    }
};

export {loadState, saveState};
