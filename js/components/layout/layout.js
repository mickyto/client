import React from 'react';
import { Container } from 'reactstrap';

import Header from './header';
import Style from '../main.scss';
import Footer from './footer';


class Layout extends React.Component {

    render() {
        return (
            <div className={Style.back}>
                <Header />
                <Container className={Style.main}>
                    {this.props.children}
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Layout;
