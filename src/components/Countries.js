import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';

const RenderCountry = ({countries, state}) => {
    return (
        <>
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
            <section className="container">
                <RenderCountry countries={props.countries} state={props.state} />
            </section>
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
        </>
    );
}

class Countries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            perPage: 12,
            currentPage: 0
        }
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
                    countries={this.props.countries}
                    state={this.state}
                    handlePageClick={this.handlePageClick} />
            </>
        );
    }
}

export default Countries;
