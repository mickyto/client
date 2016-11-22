import React from 'react';
import Relay from 'react-relay';
import { Jumbotron, Button, Container, Col, Row } from 'reactstrap';

import Style from '../main.scss';
import Images from './images';
import Prices from './prices';
import Review from './review';
import Specifications from './specifications';
import Features from './features';
import Reviews from './reviews';
import UserReview from './userReview';
import { t } from '../../translator'


class Product extends React.Component {

    render() {
        const product = this.props.viewer.product;
        return (
            <div>
                <h1 className="display-4">{`${product.vendor.name} ${product.model}`}</h1>
                <p>SKUKIT ID: {product.productId}</p>
                <Row>
                    <Col sm="5" className={Style.martop}>
                        <Images images={product} />
                    </Col>
                    <Col sm="4">
                        <Prices />
                    </Col>
                    <Col sm="3">
                        <Button href={`/profile/models/${product.productId}/specifications`} block color="warning">{t('editProduct')}</Button>
                        <br />
                        <Button block color="primary">{t('cloneTo')}</Button>
                        <br />
                        <Jumbotron>
                            <h1 className="display-3">Some add</h1>
                            <Button color="primary">Learn More</Button>
                        </Jumbotron>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm="9">
                        <Row>
                            <Review />
                            <br />
                            <Container fluid>
                                <p className="lead">{product.description}</p>
                            </Container>
                            <br />
                            <Col sm="6">
                                <Specifications specs={product} />
                            </Col>
                            <Col sm="6">
                                <Features features={product} />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="3">
                        <Jumbotron>
                            <h1 className="display-3">Some add</h1>
                            <Button color="primary">Learn More</Button>
                        </Jumbotron>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm="9">
                        <Reviews productName={`${product.vendor.name} ${product.model}`} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm="9">
                        <UserReview />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Relay.createContainer(Product, {

    initialVariables: {
        id: null
    },

    fragments:  {
        viewer: id => Relay.QL`
            fragment on Viewer {
                product( id: $id ) {
                    productId
                    model
                    description
                    vendor {
                        name
                    }
                    features {
                        feature
                    }
                    ${Features.getFragment('features')}
                    ${Images.getFragment('images')}
                    ${Specifications.getFragment('specs')}
                }
            }
        `
    }
});
