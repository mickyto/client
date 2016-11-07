import React from 'react';
import cookie from 'react-cookie';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Col,
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Search from './search';
import { header } from '../../dictionary'

const availableLocales = [
    {
        alias: 'en_EN',
        name: 'English'
    }, {
        alias: 'ru_RU',
        name: 'Русский'
    }
];

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.currencyToggle = this.currencyToggle.bind(this);
        this.languageToggle = this.languageToggle.bind(this);
        this.state = {
            currencyOpen: false,
            languageOpen: false,
            currentLang: cookie.load('locale') || { name: 'Language', alias: 'en_EN' }
        };
    }

    currencyToggle() {
        this.setState({
            currencyOpen: !this.state.currencyOpen
        });
    }

    languageToggle() {
        this.setState({
            languageOpen: !this.state.languageOpen
        });
    }

    setLang(lang) {
        this.setState({
            currentLang: lang
        });
        cookie.save('locale', lang, { path: '/' });
    }

    render() {

        const lang = this.state.currentLang.alias;
        console.log(lang);
        return (
            <Navbar color="faded" light>
                <Col sm="4" md={{ size: 2, offset: 0 }}>
                    <NavbarBrand href="/">Skukit</NavbarBrand>
                </Col>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/">{header[lang].home}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/catalog">Catalog</NavLink>
                    </NavItem>
                </Nav>
                <Search />
                <ButtonDropdown isOpen={this.state.currencyOpen} toggle={this.currencyToggle}>
                    <DropdownToggle caret>
                        Currency
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>rub</DropdownItem>
                        <DropdownItem>usd</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown isOpen={this.state.languageOpen} toggle={this.languageToggle}>
                    <DropdownToggle caret>
                        {this.state.currentLang.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        {availableLocales.map(locale => (
                            <div key={locale.name}>
                                <DropdownItem onClick={() => this.setLang(locale)}>{locale.name}</DropdownItem>
                            </div>
                        ))}
                    </DropdownMenu>
                </ButtonDropdown>
            </Navbar>
        );
    }
}

export default Header;
