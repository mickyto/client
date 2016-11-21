import React from 'react';
import Relay from 'react-relay';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { Button, Col, ButtonGroup, Breadcrumb,
    BreadcrumbItem, Jumbotron, Tag } from 'reactstrap';

import Style from '../main.scss';
import Image from './image';

class Images extends React.Component {

    componentDidMount() {
        if (!cookie.load('userToken')) {
            browserHistory.push('/login');
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            newImage: false
        };

        this.isExtraImage = this.isExtraImage.bind(this);
    }

    isExtraImage(bul) {
        this.setState({ newImage: bul })
    }

    render() {
        const product = this.props.viewer.product;
        return (
            <div>
                <Col xs="9">
                    <h1 className="display-4">Adding new model</h1>
                    <Col xs="3" className={Style.martop}>
                        <ButtonGroup vertical>
                            <Button outline color="info" size="lg" href="#">
                                My account
                            </Button>
                            <Button outline color="info" size="lg" href="#">
                                My models
                            </Button>
                            <Button outline color="info" size="lg" href="#">
                                My stores
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs="9" className={Style.martop}>
                        <Breadcrumb tag="nav">
                            <BreadcrumbItem tag="span">Basic information</BreadcrumbItem>
                            <BreadcrumbItem tag="span">Description and specifications</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Images</BreadcrumbItem>
                        </Breadcrumb>
                        <hr className="my-2" />
                        <a href={`/product/${product.productId}`}>
                            <h1 className="display-5">{`${product.vendor.name} ${product.model}`}</h1>
                        </a>
                        <h2><Tag>{product.category.name}</Tag></h2>
                        <p>SKUKIT ID: {product.productId}</p>
                        <Image image={product.front_image} isFront={'yes'} product={product.productId} relay={this.props.relay} />
                        {product.images.map((image, i) => (
                            <div key={i}>
                                {image.id !== product.front_image.id &&
                                <Image image={image} product={product.productId} relay={this.props.relay} />
                                }
                            </div>
                        ))}
                        {this.state.newImage &&
                        <Image product={product.productId} isExtraImage={this.isExtraImage} relay={this.props.relay} />
                        }
                        <div className="text-xs-center">
                            <Button href={`/profile/models/${product.productId}/specifications`} className={Style.martop}>Edit specifications</Button>
                            {' '}
                            <Button color="info" className={Style.martop} onClick={() => this.isExtraImage(true)}>Add more image</Button>
                            {' '}
                            <Button href={`/product/${product.productId}`}  className={Style.martop}>Go to product page</Button>
                        </div>
                    </Col>
                </Col>
                <Col sm="3">
                    <Jumbotron>
                        <h1 className="display-3">Some add</h1>
                        <Button color="primary">Learn More</Button>
                    </Jumbotron>
                </Col>
            </div>
        );
    }
}

export default Relay.createContainer(Images, {

    initialVariables: {
        id: null
    },

    fragments: {
        viewer: (id) => Relay.QL`
            fragment on Viewer {
                product( id: $id ) {
                    productId
                    model
                    category {
                        name
                    }
                    vendor {
                        name
                    }
                    images {
                        src
                        id
                    }
                    front_image {
                        src
                        id
                    }
                }
            }
        `
    }
});





