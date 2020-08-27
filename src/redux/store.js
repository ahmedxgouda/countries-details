import { createStore, applyMiddleware, compose } from 'redux';
import { Countries } from './reducers/Countries';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = () => {
    return createStore(Countries, 
        composeEnhancers(
            applyMiddleware(thunk)
        ));
}
