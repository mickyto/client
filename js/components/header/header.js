import React from 'react';

import NavLink from '../NavLink';
import stylus from './header.scss';

class Header extends React.Component {
    render() {
        return (
            <header className={stylus.root}>
                <ul role='menu'>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/catalog'>Catalog</NavLink></li>
                </ul>
            </header>
        );
    }
}

export default Header;
