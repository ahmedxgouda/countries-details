import React from 'react';

const Details = ({country}) => {
    if (country !== undefined) return (
        <section className="container">
            {country.name}
        </section>
    );

    else return (
        <div></div>
    );
}

export default Details;
