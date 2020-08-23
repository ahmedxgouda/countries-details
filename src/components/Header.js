import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(far, faMoon);
library.add(far, faLightbulb);

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: JSON.parse(localStorage.getItem('checked'))
        }
    }

    checkIfChecked = (element) => {
        if (element.checked) {
            document.documentElement.style.setProperty('--bg', 'hsl(207, 26%, 17%)');
            document.documentElement.style.setProperty('--elements', 'hsl(209, 23%, 22%)');
            document.documentElement.style.setProperty('--text', 'hsl(0, 0%, 100%)');
            document.documentElement.style.setProperty('--btn', '#17183B');

        } else {
            document.documentElement.style.setProperty('--bg', 'hsl(0, 0%, 98%)');
            document.documentElement.style.setProperty('--elements', 'hsl(0, 0%, 100%)');
            document.documentElement.style.setProperty('--text', 'hsl(200, 15%, 8%)');
            document.documentElement.style.setProperty('--btn', '#A0C1B9');
        }
    }

    componentDidMount() {
        const checkbox = document.querySelector('.header input');

        checkbox.checked = this.state.checked;

        this.checkIfChecked(checkbox);
        
    }
    
    handleCheck = (e) => {
        localStorage.setItem('checked', e.target.checked);
        this.checkIfChecked(e.target);
        this.setState({
            checked: e.target.checked
        });
    }

    render() {
        return (
            <header>
                <section className="header">
                    <h2>Where in the world?</h2>
                    <label>
                        {this.state.checked ? (
                            <>
                                <FontAwesomeIcon icon={['far', 'lightbulb']} /> <span>Light Mode</span>
                            </>
                        ): (
                            <>
                                <FontAwesomeIcon icon={['far', 'moon']} /> <span>Dark Mode</span>
                            </>
                        )}
                        
                        <input type="checkbox" onClick={this.handleCheck} />
                    </label>
                </section>
            </header>
        );
    }
}

export default Header;
