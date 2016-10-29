import React from 'react';
import { Row, Nav, Col, NavItem, NavLink, InputGroup,
    Input, InputGroupButton, Container } from 'reactstrap';
import Style from '../main.scss';

const Footer = () => {
    return (
        <div className={Style.footer}>
            <Container>
                <Row>
                    <Col sm="3" className="text-xs-center">
                        <Nav>
                            <NavItem>
                                <NavLink href="#">About us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Blok</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Help</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">FAQ</NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm="3" className="text-xs-center">
                        <img src="images/mobile.png" />
                    </Col>
                    <Col sm="3" className="text-xs-center">
                        <p>Languages</p>
                        <Nav>
                            <NavItem>
                                <NavLink href="#">English</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Russian</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">German</NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm="3" className="text-xs-center">
                        <img src="images/social.png" />
                    </Col>
                </Row>
                <hr className="my-2" />
                <Row>
                    <Col xs="6">
                        <InputGroup>
                            <Input />
                            <InputGroupButton color="secondary">Subscribe</InputGroupButton>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;


