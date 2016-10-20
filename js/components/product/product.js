import React from 'react';
import Relay from 'react-relay';

import Header from '../header/header';
import Style from './product.scss';
import handleImage from '../handleImage'

class Product extends React.Component {
    
    render() {
        const product = this.props.Product;
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    <h1>{product.vendor.name + " " + product.model}</h1>
                    <h3>{product.description}</h3>
                    <img src={handleImage(product.front_image.src)} />
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(Product, {
    fragments: {
        Product: (Component) => Relay.QL`
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