import React, { Component } from 'react';
import { fetchCountries } from '../redux/Action_Creators';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Countries from './Countries';

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
                <Countries countries={this.props.countries.countries}
                    isLoading={this.props.countries.isLoading}
                    errMess={this.props.countries.errMess} />
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
