import React from 'react';
import { Container } from 'reactstrap';
import Relay from 'react-relay';

import Header from './header';
import Style from '../main.scss';
import Footer from './footer';


class Layout extends React.Component {

    render() {
        return (
            <div className={Style.back}>
                <Header locales={this.props.viewer.locales} />
                <Container className={Style.main}>
                    {this.props.children}
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Relay.createContainer(Layout, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                locales {
                    name
                }
            }
        `
    }
});
