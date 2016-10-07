import React from 'react';
import stylus from './header.scss';

class Header extends React.Component {
	render() {
		return (
			<header className={stylus.root}>
				<a href="/">Home</a>
			</header>
		)
	}
}

export default Header;
