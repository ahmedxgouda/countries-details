import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(far, faMoon, faLightbulb);

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: JSON.parse(localStorage.getItem('checked'))
        }
    }

    checkIfChecked = (element) => {

        const root = document.documentElement;
        if (element.checked) {
            root.style.setProperty('--bg', 'hsl(207, 26%, 17%)');
            root.style.setProperty('--elements', 'hsl(209, 23%, 22%)');
            root.style.setProperty('--text', 'hsl(0, 0%, 100%)');
            root.style.setProperty('--shadow', '1px 1px 8px rgba(0, 0, 0, 0.2)');
            root.style.setProperty('--input', 'hsl(0, 0%, 100%)');
            root.style.setProperty('--focused', '#3E505B');

        } else {
            root.style.setProperty('--bg', 'hsl(0, 0%, 98%)');
            root.style.setProperty('--elements', 'hsl(0, 0%, 100%)');
            root.style.setProperty('--text', 'hsl(200, 15%, 8%)');
            root.style.setProperty('--shadow', '1px 1px 8px rgba(0, 0, 0, 0.1)');
            root.style.setProperty('--input', 'hsl(0, 0%, 52%)');
            root.style.setProperty('--focused', '#F5F5F5');
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
                <div className="header">
                    <h2>Where in the world?</h2>
                    <label htmlFor="theme-switcher">
                        {this.state.checked ? (
                            <>
                                <FontAwesomeIcon icon={['far', 'lightbulb']} /> <span>Light Mode</span>
                            </>
                        ): (
                            <>
                                <FontAwesomeIcon icon={['far', 'moon']} /> <span>Dark Mode</span>
                            </>
                        )}
                        
                        <input type="checkbox" onClick={this.handleCheck} id="theme-switcher" />
                    </label>
                </div>
            </header>
        );
    }
}

export default Header;
