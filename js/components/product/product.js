import React from 'react';
import Relay from 'react-relay';
import { Jumbotron, Button, CardDeck, Card,
    Container, Col, Row } from 'reactstrap';

import Header from '../header/header';
import Style from '../main.scss';
import Prices from './prices';
import Review from './review';
import Specifications from './specifications';
import Features from './features';
import Reviews from './reviews';
import UserReview from './userReview';
import Footer from '../footer/footer';
import handleImage from '../handleImage';

class Product extends React.Component {

    render() {
        const product = this.props.Product;
        return (
            <div className={Style.back}>
                <Header />
                <Container className={Style.main}>
                    <h1 className="display-4">{`${product.vendor.name} ${product.model}`}</h1>
                    <p>SKUKIT ID: {product.productId}</p>
                    <Row>
                    <Col sm="5" className={Style.martop}>
                        <img width="430" src={ product.front_image !== null ? handleImage(product.front_image.src) : '/images/noImage.png' } alt='front' />
                        <Col sm="12" className={Style.martop}>
                            <CardDeck>
                                <Card>
                                    <img width="100" src={ product.front_image !== null ? handleImage(product.front_image.src) : '/images/noImage.png' } alt='front' />
                                </Card>

                                <Card>
                                    <img width="100" src={ product.front_image !== null ? handleImage(product.front_image.src) : '/images/noImage.png' } alt='front' />
                                </Card>

                                <Card>
                                    <img width="100" src={ product.front_image !== null ? handleImage(product.front_image.src) : '/images/noImage.png' } alt='front' />
                                </Card>
                                <Card>
                                    <img width="100" src={ product.front_image !== null ? handleImage(product.front_image.src) : '/images/noImage.png' } alt='front' />
                                </Card>
                           </CardDeck>
                        </Col>
                    </Col>
                    <Col sm="4">
                        <Prices />
                    </Col>
                    <Col sm="3">
                        <Button block color="primary">Clone to your account</Button>
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
                                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.  Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.</p>
                            </Container>
                            <br />
                            <Col sm="6">
                                <Specifications />
                            </Col>
                            <Col sm="6">
                                <Features />
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
                            <Reviews />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm="9">
                            <UserReview />
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}

Product.propTypes = {
    Product: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Product, {
    fragments: {
        Product: () => Relay.QL`
            fragment on ProductType {
                productId
                model
                vendor {
                    name
                }
                front_image {
                    src
                }
            }
        `
    }
});
