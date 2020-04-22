const createStore = (initialState, reducer) => {
    let state = initialState;
    let subscribers = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);

        subscribers.forEach(func => func())

        return state;
    };

    const subscribe = (func) => {
        subscribers = [...subscribers, func]
    }

    const unsubscribe = (func) => {
        subscribers = subscribers.filter(x => x !== func)
    }

    return [getState, dispatch, subscribe, unsubscribe]
}

export default createStore;