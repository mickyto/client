import React from 'react';
import Relay from 'react-relay';
import { Row, Container } from 'reactstrap';

import Header from '../header/header';
import Categories from '../categories/categories';
import Vendors from '../vendors/vendors';
import Description from './Description';
import Motivation from './Motivation';
import New from './New';
import Footer from '../footer/footer';
import Style from '../main.scss';

class index extends React.Component {

    render() {
        return (
            <div className={Style.back}>
                <Header />
                <Container>
                    <Row className={Style.main}>
                        <Categories categories={this.props.viewer.categories} />
                        <Description />
                        <Motivation />
                    </Row>
                    <New />
                    <Vendors vendors={this.props.viewer.vendors} />
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Relay.createContainer(index, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                vendors {
                    vendorId
                    name
                    logotype
                }
                categories {
                    categoryId
                    name
                    ico
                }
            }
        `
    }
});
