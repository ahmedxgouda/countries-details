import axios from 'axios';
import * as Action_Types from './Action_Types';
import baseUrl from '../shared/baseUrl';

export const fetchCountries = () => dispatch => {
    dispatch(countriesLoading(true));
    axios.get(baseUrl)
        .then(response => dispatch(addCountries(response.data.filter(country => {
            return country.name === 'Palestine, State of' ? country.name = 'Palestine' : country.name !== 'Israel';
        }))))
        .catch(error => dispatch(countriesFailed(error.message)));
}

export const addCountries = (countries) => ({
    type: Action_Types.ADD_COUNTRIES,
    payload: countries
});

export const countriesLoading = () => ({
    type: Action_Types.COUNTRIES_LOADING
});

export const countriesFailed = (errMess) => ({
    type: Action_Types.COUNTRIES_FAILED,
    payload: errMess
});
