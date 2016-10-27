import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import Header from '../header/header';
import Style from './category.scss';
import handleImage from '../handleImage';

class category extends React.Component {

    render() {
        const categ = this.props.Category;
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    <h2>{categ.name}</h2>
                    {categ.products.map(product => (
                        <li key={product.productId}>
                            <Link to={`/product/${product.productId}`}>{`${product.vendor.name} ${product.model}`}</Link>
                            <img src={handleImage(product.front_image.src)} alt='front' />
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}

category.propTypes = {
    Category: React.PropTypes.object.isRequired
};

export default Relay.createContainer(category, {
    fragments: {
        Category: () => Relay.QL`
            fragment on Category {
                name
                products {
                    productId
                    model
                    vendor {
                        name
                    }
                    front_image {
                        src
                    }
                }
            }
        `,
    }
});
