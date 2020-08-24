import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';
import Filters from './Filters';

const RenderCountry = ({countries, state}) => {
    return (
        <>
            {countries.length === 0 ? (
                <p>Sorry, no countries found match <i><strong>{state.name}</strong></i></p>
            ) : null}
            {countries.slice(state.offset, state.offset + state.perPage).map(country => (
                <section className="box" key={country.name}>
                    <section className="img" style={{backgroundImage: `url(${country.flag})`}} />
                    <section className="text">
                        <h3>{country.name}</h3>
                        {country.population ? (<p>Population: <span>{country.population.toLocaleString()}</span></p>) : null}

                        {country.region ? (<p>Region: <span>{country.region}</span></p>) : null}

                        {country.capital ? (<p>Capital: <span>{country.capital}</span></p>) : null}
                    </section>
                </section>                    
            ))}
        </>
    );
}

const List = (props) => {
    if (props.isLoading) return (
        <Loading />
    );
    else if (props.errMess) return (
        <p>props.errMess</p>
    );
    else return (
        <>
            <Filters changeName={props.changeName} />
            <section className={`container${props.countries.length === 0 ? ' container-no-match' : ''}`}>
                <RenderCountry countries={props.countries} state={props.state} />
            </section>
            {props.countries.length !== 0 ? (
                <section className="container container-pagination">
                    <ReactPaginate previousLabel={'Prev'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break'}
                        pageCount={Math.ceil(props.countries.length / props.state.perPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={props.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </section>
            ) : null}
            
        </>
    );
}

class Countries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            perPage: 12,
            currentPage: 0,
            name: '',
            region: ''
        }
    }

    changeName = (value) => {
        this.setState({name: value});
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        })
    }

    render() {

        return (
            <>
                <List isLoading={this.props.isLoading}
                    errMess={this.props.errMess}
                    countries={this.props.countries.filter(country => {
                        const stateName =  this.state.name.trim().toLowerCase().split('');
                        // const stateRegion = this.state.region.toLowerCase();
                        const countryName = country.name.toLowerCase().split('');

                        const nameExists = stateName.every(char => countryName.includes(char));
                        const nameNotExist = this.state.name === '';
                        const regionNotExists = this.state.region === '';

                        const checkIfNameMatches = stateName.length === 1 ? nameExists && countryName[0] === stateName[0] : stateName.length === 2 ? nameExists && (countryName[0] === stateName[0] && countryName[1] === stateName[1]) : stateName.length >= 3 ?  nameExists && (countryName[0] === stateName[0] && countryName[1] === stateName[1] && countryName[2] === stateName[2]) : nameExists;

                        const find2AlphaCode = this.state.name.toLowerCase() === country.alpha2Code.toLowerCase();

                        const find3AlphaCode = this.state.name.toLowerCase() === country.alpha3Code.toLowerCase();

                        if (nameNotExist && regionNotExists) {
                            return country;

                        } else if (!nameNotExist && regionNotExists) {
                            return checkIfNameMatches || find2AlphaCode || find3AlphaCode;
                        }
                    })}
                    state={this.state}
                    changeName={this.changeName}
                    handlePageClick={this.handlePageClick} />
            </>
        );
    }
}

export default Countries;
