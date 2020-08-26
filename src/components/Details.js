import React, { Component } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas, faArrowLeft);

const RenderDetails = ({country, countries}) => {
    return (
        <section className="box details" key={country.alpha3Code}>
            <section className="img" style={{backgroundImage: `url(${country.flag})`}}>            </section>
            <section className="text">
                <section className="info">
                    <section>
                        <h2>{country.name}</h2>
                    </section>
                    <section className="main">
                        <section>
                            <p>Native Name: {country.nativeName ? (<span>{country.nativeName}</span>) : (<i>No informations found</i>)}</p>

                            <p>Population: {country.population ? (<span>{country.population.toLocaleString()}</span>) : (<i>No informations found</i>)}</p>

                            <p>Region: {country.region ? (<span>{country.region}</span>) : (<i>No informations found</i>)}</p>

                            <p>Sub Region: {country.subregion ? (<span>{country.subregion}</span>) : (<i>No informations found</i>)}</p>

                            <p>Capital: {country.capital ? (<span>{country.capital}</span>) : (<i>No informations found</i>)}</p>
                        </section>
                        <section className="other-info">
                            <p>Top Level Domain: {country.topLevelDomain.length !== 0 ? country.topLevelDomain.map((domain, index) => (<span key={Math.random()}>{(index ? ', ' : '') + domain}</span>)) : (<i>No informations found</i>)}</p>

                            <p>Currencies: {country.currencies.length !== 0  ? country.currencies.map((curr, index) => (<span key={Math.random()}>{(index ? ', ' : '') + curr.name}</span>)) : (<i>No informations found</i>)}</p>

                            <p>Languages: {country.languages.length !== 0  ? country.languages.map((lang, index) => (<span key={Math.random()}>{(index ? ', ' : '') + lang.name} 
                            </span>)) : (<i>No informations found</i>)}</p>
                        </section>
                    </section>
                </section>
                <section className="borders">
                    <p>Border Countries: {country.borders.length !== 0  ? country.borders.map(border => countries.filter(country => country.alpha3Code === border).map(country => (<Link to={`/home/${country.alpha3Code}`} key={country.alpha3Code}><span>{country.name} </span></Link>))) : (<i>No informations found</i>)}</p>
                </section>
            </section>
        </section>
    );
}

const RenderBtn = () => {
    return (
        <section className="filters" style={{position: 'relative', margin: '0 auto 0 0'}}>
            <Link to="/home" className='btn'><FontAwesomeIcon style={{position: 'absolute', top: '10px', left: '10px'}} icon={['fas', 'arrow-left']} /> Back</Link>
        </section>
    );
}

class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({isLoading: false});
    }

    render() {
        if (this.props.country !== undefined) return (
            <>
                <section className="container" style={{display: "flex", padding: "3% 5% 20px 5%"}}>
                    <RenderBtn />
                </section>
                <section className="container" style={{display: "block"}}>
                    <RenderDetails country={this.props.country} countries={this.props.countries} />
                </section>
            </>
        );

        else if (this.props.isLoading) return (
            <Loading />
        );

        else if (this.state.isLoading) return (
            <Loading />
        );

        else if (this.props.errMess) return (
            <p>{this.props.errMess}</p>
        );

        else return null;
    }
}

export default Details;
