import React from 'react';
import { Link } from 'react-router'
import stylus from './header.scss';

class Header extends React.Component {
	render() {
		return (
			<header className={stylus.root}>
				<ul role="nav">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/catalog">Catalog</Link></li>
				</ul>
			</header>
		)
	}
}

export default Header;
