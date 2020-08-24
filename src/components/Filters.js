import React from 'react';
import { faSearch, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas, faSearch);

const Filters = ({changeName}) => {
    return (
        <section className="container container-filter">
            <section className="filters">
                <section className="search">
                <FontAwesomeIcon icon={['fas', 'search']} /><input type="text" placeholder="Search for a country..." onChange={(e) => changeName(e.target.value)} />
                </section>
            </section>
        </section>
    );
}

export default Filters;
