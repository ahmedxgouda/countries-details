import React, { Component } from 'react';
import { fetchCountries } from '../redux/Action_Creators';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Countries from './Countries';
import Details from './Details';
import Header from './Header';
import { AnimatePresence, motion } from 'framer-motion';

const mapStateToProps = state => ({
    countries: state.countries,
    isLoading: state.isLoading,
    errMess: state.errMess
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
                <AnimatePresence exitBeforeEnter>
                    <Switch location={this.props.location} key={this.props.location.pathname} >
                        <Route exact path='/home' component={() => <Countries countries={this.props.countries}
                        isLoading={this.props.isLoading}
                        errMess={this.props.errMess} />}
                         />

                        <Route path='/home/:alpha3Code' component={({match}) =>
                            <Details country={this.props.countries.filter(country => match.params.alpha3Code === country.alpha3Code)[0]} 
                                countries={this.props.countries}
                                isLoading={this.props.isLoading}
                                errMess={this.props.errMess} />} />
                        <motion.section exit="undefined">
                            <Redirect to='/home' />
                        </motion.section>
                    </Switch>
                </AnimatePresence>
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
