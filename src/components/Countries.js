import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class Countries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            perPage: 16,
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
                {this.props.countries.slice(this.state.offset, this.state.offset + this.state.perPage).map(country => (

                    <div key={country.name}>{country.name}</div>
                        
                ))}
                <ReactPaginate previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break'}
                    pageCount={Math.ceil(this.props.countries.length / this.state.perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    />
            </>
        );
    }
}

export default Countries;
