import React, { useEffect } from 'react';
import { faSearch, fas, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas, faSearch, faAngleDown);

const Filters = ({changeName, isOpen, handleOpen, changeRegion, region}) => {
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    const transList = () => {
        const list = document.querySelector('.select .list');
        if (isOpen) {
            list.style.display = 'block';
            setTimeout(() => list.style.transform = 'scale(1, 1)', 10);
        }
        else {
            list.style.transform = 'scale(0, 0)';
            setTimeout(() => list.style.display = 'none', 200);
        }
    }

    isOpen ? document.addEventListener('click', handleOpen) : document.removeEventListener('click', handleOpen);

    useEffect(transList);
    
    return (
        <div className="container container-filter">
            <div className="filters">
                <div className="search">
                <label htmlFor="search">
                    <FontAwesomeIcon icon={['fas', 'search']} /><input type="text" placeholder="Search for a country..." onChange={(e) => changeName(e.target.value)} name="search" id="search" />
                </label>
                </div>
                <div className="select">
                    <div className="selected" onClick={handleOpen}>
                        {region === '' ? (<button>Filter by Region</button>) : (<button>{region}</button>)}
                        <FontAwesomeIcon icon={['fas', 'angle-down']} />
                    </div>
                    <div className="list">
                        <ul>
                            {region !== '' ? (<li onClick={() => {
                                handleOpen();
                                changeRegion('');
                            }}><button>All</button></li>) : null}
                            {regions.map(region => (
                                <li key={Math.random()} onClick={() => {
                                    handleOpen();
                                    changeRegion(region);
                                }}><button>{region}</button></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
