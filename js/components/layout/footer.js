import React from 'react';
import cookie from 'react-cookie';
import { Row, Nav, Col, NavItem, NavLink, InputGroup,
    Input, InputGroupButton, Container } from 'reactstrap';
import FaApple from 'react-icons/lib/fa/apple'
import FaAndroid from 'react-icons/lib/fa/android'
import FaWindows from 'react-icons/lib/fa/windows'
import FaInstagram from 'react-icons/lib/fa/instagram'
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square'
import FaTwitter from 'react-icons/lib/fa/twitter-square'

import Style from '../main.scss';
import { t, locales } from '../../translator'

class Footer extends React.Component {

    setLang(locale) {
        cookie.save('locale', locale, { path: '/' });
        window.location.reload()
    }

    render() {

        return (
            <div className={Style.footer}>
                <Container className={Style.footer}>
                    <Row>
                        <Col sm="3" className="text-xs-center">
                            <Nav>
                                <NavItem>
                                    <NavLink href="#">{t('aboutUs')}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">{t('blog')}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">{t('help')}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">FAQ</NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm="3" className="text-xs-center">
                            <FaApple className={Style.mobIcon}/>
                            <FaAndroid className={Style.mobIcon}/>
                            <FaWindows className={Style.mobIcon}/>
                        </Col>
                        <Col sm="3" className="text-xs-center">
                            <p>{t('languages')}</p>
                            <Nav>
                                {locales.map(locale => (
                                    <NavItem key={locale.name}>
                                        <NavLink href="#" onClick={() => this.setLang(locale)}>{locale.name}</NavLink>
                                    </NavItem>
                                ))}
                            </Nav>
                        </Col>
                        <Col sm="3" className="text-xs-center">
                            <FaInstagram className={Style.mobIcon}/>
                            <FaFacebookSquare className={Style.mobIcon}/>
                            <FaTwitter className={Style.mobIcon}/>
                        </Col>
                    </Row>
                    <hr className="my-2"/>
                    <Row>
                        <Col xs="6">
                            <InputGroup>
                                <Input />
                                <InputGroupButton color="secondary">{t('subscribe')}</InputGroupButton>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Footer;


