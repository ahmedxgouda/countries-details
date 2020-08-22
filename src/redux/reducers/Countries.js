import * as Action_Types from '../Action_Types';

export const Countries = (state = {
    isLoading: true, errMess: null, countries: []
    }, action) => {

        switch(action.type) {

            case Action_Types.ADD_COUNTRIES:
                return {...state, isLoading: false, errMess: null, countries: action.payload}

            case Action_Types.COUNTRIES_LOADING:
                return {...state, isLoading: true, errMess: null, countries: []}

            case Action_Types.COUNTRIES_FAILED:
                return {...state, isLoading: false, errMess: action.payload, countries: []}

            default:
                return state;
        }
}
