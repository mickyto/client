import React from 'react';
import Relay from 'react-relay';
import { Row } from 'reactstrap';

import Categories from './categories';
import Vendors from '../vendors/vendors';
import Description from './description';
import Motivation from './motivation';
import New from './new';
import Style from '../main.scss';


class index extends React.Component {

    render() {
        return (
            <div>
                <Row className={Style.main}>
                    <Categories categories={this.props.viewer.categories} />
                    <Description />
                    <Motivation />
                </Row>
                <New />
                <Vendors vendors={this.props.viewer.vendors} />
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
                    logo
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
