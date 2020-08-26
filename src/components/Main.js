import React, { Component } from 'react';
import { fetchCountries } from '../redux/Action_Creators';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Countries from './Countries';
import Details from './Details';
import Header from './Header';

const mapStateToProps = state => ({
    countries: state.countries
});

const mapDispatchToProps = dispatch => ({
    fetchCountries: () => {dispatch(fetchCountries())}
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchCountries();
    }

    render() {
        return (
            <>
                <Header />
                <Switch>
                    <Route exact path='/home' component={() => <Countries countries={this.props.countries.countries}
                    isLoading={this.props.countries.isLoading}
                    errMess={this.props.countries.errMess} />} />
                    <Route path='/home/:alpha3Code' component={({match}) => <Details country={this.props.countries.countries.filter(country => match.params.alpha3Code === country.alpha3Code)[0]} 
                    countries={this.props.countries.countries}
                    isLoading={this.props.countries.isLoading}
                    errMess={this.props.countries.errMess} />} />
                    <Redirect to='/home' />
                </Switch>
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
