import React from 'react';
import cookie from 'react-cookie';
import { Navbar, Col, ButtonDropdown, DropdownToggle, 
    DropdownMenu, DropdownItem } from 'reactstrap';

import Search from './search';
import { t, locales } from '../../translator'

class Header2 extends React.Component {

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

    setLang(locale) {
        this.setState({
            currentLang: locale
        });
        cookie.save('locale', locale, { path: '/' });
        window.location.reload()
    }

    render() {
        return (
            <Navbar color="faded" light >
                <Col sm="12" md={{ size: 8, offset: 0 }} className="text-xs-right float-xs-right">
                    <Search />
                    <ButtonDropdown isOpen={this.state.currencyOpen} toggle={this.currencyToggle}>
                        <DropdownToggle caret>
                            {t('currency')}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>{t('ruble')}</DropdownItem>
                            <DropdownItem>{t('dollar')}</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown isOpen={this.state.languageOpen} toggle={this.languageToggle}>
                        <DropdownToggle caret>
                            {this.state.currentLang.name}
                        </DropdownToggle>
                        <DropdownMenu>
                            {locales.map(locale => (
                                <div key={locale.name}>
                                    <DropdownItem onClick={() => this.setLang(locale)}>{locale.name}</DropdownItem>
                                </div>
                            ))}
                        </DropdownMenu>
                    </ButtonDropdown>
                </Col>
            </Navbar>
        );
    }
}

export default Header2;