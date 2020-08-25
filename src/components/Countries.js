import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';
import Filters from './Filters';
import { Link } from 'react-router-dom';

const RenderCountry = ({countries, state}) => {
    return (
        <>
            {countries.length === 0 ? (
                <p>Sorry, no countries found match <strong>{state.name}</strong> {state.region !== '' ? (<>in {state.region}</>) : null}</p>
            ) : null}
            {countries.slice(state.offset, state.offset + state.perPage).map(country => (
                
                    <section className="box" key={country.name}>
                        <Link to={`/home/${country.alpha3Code}`}>
                        <section className="img" style={{backgroundImage: `url(${country.flag})`}} />
                        <section className="text">
                            <h3>{country.name}</h3>
                            {country.population ? (<p>Population: <span>{country.population.toLocaleString()}</span></p>) : null}

                            {country.region ? (<p>Region: <span>{country.region}</span></p>) : null}

                            {country.capital ? (<p>Capital: <span>{country.capital}</span></p>) : null}
                        </section>
                        </Link>
                    </section>   
                        
            ))}
        </>
    );
}

const List = (props) => {
    if (props.isDataLoading) return (
        <Loading />
    );
    else if (props.isComponentLoading) return (
        <Loading />
    );
    else if (props.errMess) return (
        <p>props.errMess</p>
    );
    else return (
        <>
            <Filters changeName={props.changeName} 
            changeRegion={props.changeRegion}
            region={props.region}
            isOpen={props.isOpen} 
            handleOpen={props.handleOpen} />
            <section className={`container${props.countries.length === 0 ? ' container-no-match' : ''}`}>
                <RenderCountry countries={props.countries} state={props.state} />
            </section>
            {props.countries.length > 12 ? (
                <section className="container container-pagination">
                    <ReactPaginate previousLabel={'Prev'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break'}
                        pageCount={Math.ceil(props.countries.length / props.state.perPage)}
                        forcePage={props.state.currentPage}
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
            region: '',
            isLoading: true,
            isOpen: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        })
    }

    handleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    changeName = (value) => {
        this.setState({name: value, offset: 0, currentPage: 0});
    }

    changeRegion = (value) => {
        this.setState({region: value, offset: 0, currentPage: 0});
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
                <List isComponentLoading={this.state.isLoading}
                    isDataLoading={this.props.isLoading}
                    errMess={this.props.errMess}
                    countries={this.props.countries.filter(country => {
                        const stateName =  this.state.name.trim().toLowerCase();
                        // const stateRegion = this.state.region.toLowerCase();
                        const countryName = country.name.trim().toLowerCase();

                        const nameNotExist = this.state.name === '';
                        const regionNotExists = this.state.region === '';
            
                        const nameExists = countryName.includes(stateName);

                        const findAlpha2Code = stateName === country.alpha2Code.trim().toLowerCase();
                        const findAlpha3Code = stateName === country.alpha3Code.trim().toLowerCase();

                        const checkIfNameMatches = nameExists || findAlpha2Code || findAlpha3Code;

                        const checkIfRegionMatches = this.state.region === country.region;

                        if (nameNotExist && regionNotExists) {
                            return country;

                        } else if (!nameNotExist && regionNotExists) {
                            return checkIfNameMatches;

                        } else if (!regionNotExists && nameNotExist) {
                            return checkIfRegionMatches;
                            
                        } else {
                            return checkIfRegionMatches && checkIfNameMatches;
                        }
                    })}
                    state={this.state}
                    changeName={this.changeName}
                    changeRegion={this.changeRegion}
                    region={this.state.region}
                    isOpen={this.state.isOpen}
                    handleOpen={this.handleOpen}
                    handlePageClick={this.handlePageClick} />
            </>
        );
    }
}

export default Countries;
