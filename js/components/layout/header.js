import React from 'react';
import cookie from 'react-cookie';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Col } from 'reactstrap';

import { t } from '../../translator'

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            isLoggedIn: cookie.load('userToken') ? true : false
        };
    }

    handleLogout() {
        cookie.remove('userName', { path: '/' });
        cookie.remove('userToken', { path: '/' });
        window.location.reload()
    }


    render() {
        return (
            <Navbar color="faded" light>
                <Col sm="2">
                    <NavbarBrand href="/">Skukit</NavbarBrand>
                </Col>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/">{t('home')}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/catalog">{t('catalog')}</NavLink>
                    </NavItem>
                    {!this.state.isLoggedIn &&
                    <NavItem>
                        <NavLink href="/login">{t('login')}</NavLink>
                    </NavItem>
                    }
                    {!this.state.isLoggedIn &&
                    <NavItem>
                        <NavLink href="/signup">{t('signup')}</NavLink>
                    </NavItem>
                    }
                    {this.state.isLoggedIn &&
                    <div>
                        <NavItem className="float-xs-right">
                            <Col sm="2">
                                <NavLink href="/profile">{cookie.load('userName')}</NavLink>
                            </Col>
                        </NavItem>
                        <NavItem className="float-xs-right">
                            <NavLink href="#" onClick={this.handleLogout}>{t('logout')}</NavLink>
                        </NavItem>
                    </div>
                    }
                </Nav>
            </Navbar>   
        );
    }
}

export default Header;
