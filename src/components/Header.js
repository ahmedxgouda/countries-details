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
            root.classList.remove('light-theme');
            root.classList.add('dark-theme');

        } else {
            root.classList.remove('dark-theme');
            root.classList.add('light-theme');
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
                    <input type="checkbox" onClick={this.handleCheck} id="theme-switcher" name="theme-switcher" />
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
                    </label>
                </div>
            </header>
        );
    }
}

export default Header;
