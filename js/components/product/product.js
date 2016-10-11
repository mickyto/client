import React from 'react';
import Relay from 'react-relay';

import Header from '../header/header';
import Style from './product.scss';
import Config from 'Config'

class Product extends React.Component {

    handleImage(name) {
        return `${Config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`
    }

    render() {
        const product = this.props.Product;
        console.log(product.specifications);
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    <h1>{product.vendor.name + " " + product.model}</h1>
                    <h3>{product.description}</h3>
                    <img src={this.handleImage(product.front_image.src)} />
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