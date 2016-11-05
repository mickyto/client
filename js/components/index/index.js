import React from 'react';
import Relay from 'react-relay';
import { Row } from 'reactstrap';

import Categories from '../categories/categories';
import Vendors from '../vendors/vendors';
import Description from './Description';
import Motivation from './Motivation';
import New from './New';
import Style from '../main.scss';
import Layout from '../layout/layout';


class index extends React.Component {

    render() {
        return (
            <Layout>
                <Row className={Style.main}>
                    <Categories categories={this.props.viewer.categories} />
                    <Description />
                    <Motivation />
                </Row>
                <New />
                <Vendors vendors={this.props.viewer.vendors} />
            </Layout>
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
