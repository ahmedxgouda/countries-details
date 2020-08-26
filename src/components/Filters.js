import React from 'react';
import { faSearch, fas, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas, faSearch, faAngleDown);

const Filters = ({changeName, isOpen, handleOpen, changeRegion, region}) => {
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    isOpen ? document.addEventListener('click', handleOpen) : document.removeEventListener('click', handleOpen);
    return (
        <section className="container container-filter">
            <section className="filters">
                <section className="search">
                <FontAwesomeIcon icon={['fas', 'search']} /><input type="text" placeholder="Search for a country..." onChange={(e) => changeName(e.target.value)} />
                </section>
                <section className="select">
                    <section className="selected" onClick={handleOpen}>
                        {region === '' ? (<span>Filter by Region</span>) : (<span>{region}</span>)}
                        <FontAwesomeIcon icon={['fas', 'angle-down']} />
                    </section>
                    <section className="list" style={{transform: isOpen ? 'scale(1, 1)' : 'scale(0, 0)'}}>
                        <ul>
                            {region !== '' ? (<li onClick={() => {
                                handleOpen();
                                changeRegion('');
                            }}>All</li>) : null}
                            {regions.map(region => (
                                <li key={Math.random()} onClick={() => {
                                    handleOpen();
                                    changeRegion(region);
                                }}>{region}</li>
                            ))}
                        </ul>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default Filters;
