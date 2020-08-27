import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
    initial: {
        y: '100vh'
    },
    in: {
        y: '0'
    },
    out: {
        x: '-100vw',
        transition: {
            ease: 'easeInOut'
        }
    }
}

const tranistions = {
    transition: 'easeInOut'
}

const RenderCountry = ({countries, state}) => {
    return (
        <>
            {countries.length === 0 ? (
                <p>Sorry, no countries found match <strong>{state.name}</strong> {state.region !== '' && state.name.trim().toLowerCase() !== 'israel' ? (<>in {state.region}</>) : null}</p>
            ) : null}
            {state.name.trim().toLowerCase() === 'israel' ? (<p>Did you mean <Link to="/home/PSE"><strong>Palestine?</strong></Link></p>) : null}
            {countries.slice(state.offset, state.offset + state.perPage).map(country => (
                
                    <motion.div className="box" key={country.name}>
                        <Link to={`/home/${country.alpha3Code}`}>
                            <div className="img" style={{backgroundImage: `url(${country.flag})`}}>
                            </div>
                            <p className="click">Click to view details about <strong>{country.name}</strong></p>
                            <div className="text">
                                <h3>{country.name}</h3>
                                <p>Population: {country.population ? (<span>{country.population.toLocaleString()}</span>) : (<i>No informations found</i>)}</p>

                                <p>Region: {country.region ? (<span>{country.region}</span>) : (<i>No informations found</i>)}</p>

                                <p>Capital: {country.capital ? (<span>{country.capital}</span>) : (<i>No informations found</i>)}</p>
                            </div>
                        </Link>
                    </motion.div>   
                        
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
        <p>{props.errMess}</p>
    );
    else return (
        <motion.div variants={containerVariants} initial="initial" animate="in" exit="out" transition={tranistions}>
            <Filters changeName={props.changeName} 
            changeRegion={props.changeRegion}
            region={props.region}
            isOpen={props.isOpen} 
            handleOpen={props.handleOpen} />
            <div className={`container${props.countries.length === 0 ? ' container-no-match' : ''}`}>
                <RenderCountry countries={props.countries} state={props.state} />
            </div>
            {props.countries.length > 12 ? (
                <div className="container container-pagination">
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
                </div>
            ) : null}
            
        </motion.div>
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
        });
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
            <List isComponentLoading={this.state.isLoading}
                isDataLoading={this.props.isLoading}
                errMess={this.props.errMess}
                animating={this.props.prepareAnimating}
                countries={this.props.countries.filter(country => {
                    const stateName =  this.state.name.trim().toLowerCase();
                    const countryName = country.name.trim().toLowerCase();

                    const nameNotExist = this.state.name === '';
                    const regionNotExists = this.state.region === '';
        
                    const nameExists = countryName.includes(stateName);

                    const findAlpha2Code = stateName === country.alpha2Code.trim().toLowerCase();
                    const findAlpha3Code = stateName === country.alpha3Code.trim().toLowerCase();
                    
                    const findAltSpellings = country.altSpellings.filter(alt => stateName.length > 4 ? alt.trim().toLowerCase().includes(stateName) : alt.trim().toLowerCase() === stateName);

                    const checkIfAltSpellingsMatch = () => {
                        for (let alt of findAltSpellings) {
                            return alt;
                        }
                    }

                    const findNativeName = country.nativeName.trim().toLowerCase().includes(stateName);

                    const checkIfNameMatches = nameExists || findAlpha2Code || findAlpha3Code || checkIfAltSpellingsMatch() || findNativeName;

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
        );
    }
}

export default Countries;
