import React from 'react';
import Relay from 'react-relay';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { Button, Col, ButtonGroup, Breadcrumb,
    BreadcrumbItem, Jumbotron, Tag } from 'reactstrap';

import Style from '../main.scss';
import SpecificationsForm from './specificationsForm';
import Description from './fields/description';
import Features from './fields/features';
import { t } from '../../translator'

class NewSpecifications extends React.Component {

    componentDidMount() {
        if (!cookie.load('userToken')) {
            browserHistory.push('/login');
        }
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
                                My stores
                            </Button>
                            <Button outline color="info" size="lg" href="#">
                                My models
                            </Button>
                            <Button outline color="info" size="lg" href="#">
                                My account
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs="9" className={Style.martop}>
                        <Breadcrumb tag="nav">
                            <BreadcrumbItem>
                                <a href={`/product/${product.productId}`}>
                                    {`${product.vendor.name} ${product.model}`}
                                </a>
                            </BreadcrumbItem>
                            <BreadcrumbItem>Description and specifications</BreadcrumbItem>
                            <BreadcrumbItem>
                                <a href={`/profile/models/${product.productId}/images`}>
                                    Images
                                </a>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <hr className="my-2" />
                        <h2><Tag>{product.category.name}</Tag></h2>
                        <p>SKUKIT ID: {product.productId}</p>
                        <Description product={product.productId} data={product.description} />
                        <hr className="my-2" />
                        <SpecificationsForm specs={product} />
                        <hr className="my-2" />
                        <Features features={product} />
                        <div className="text-xs-center">
                            <Button href={`/product/${product.productId}`}>Go to product page</Button>
                            {' '}
                            <Button href={`/profile/models/${product.productId}/images`}>Add images</Button>
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

export default Relay.createContainer(NewSpecifications, {

    initialVariables: {
        id: null
    },

    fragments: {
        viewer: (id) => Relay.QL`
            fragment on Viewer {
                product( id: $id ) {
                    productId
                    model
                    description
                    category {
                        name
                    }
                    vendor {
                        name
                    }
                    ${SpecificationsForm.getFragment('specs')}
                    ${Features.getFragment('features')}
                }
            }
        `
    }
});