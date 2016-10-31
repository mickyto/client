import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Col,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Search from './search';


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.currencyToggle = this.currencyToggle.bind(this);
        this.languageToggle = this.languageToggle.bind(this);
        this.state = {
            currencyOpen: false,
            languageOpen: false
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

    render() {
        return (
            <Navbar color="faded" light>
                <Col sm="4" md={{ size: 2, offset: 0 }}>
                    <NavbarBrand href="/">Skukit</NavbarBrand>
                </Col>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
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
                        Language
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>ru</DropdownItem>
                        <DropdownItem>en</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Navbar>
        );
    }
}

export default Header;
