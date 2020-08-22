import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Countries } from './reducers/Countries';
import thunk from 'redux-thunk';

export const Store = () => {
    return createStore(combineReducers({
        countries: Countries
    }), 
        applyMiddleware(thunk));
}
