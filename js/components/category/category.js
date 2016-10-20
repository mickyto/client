import React from 'react'
import Relay from 'react-relay';
import { Link } from 'react-router'

import Header from '../header/header';
import Style from './category.scss';
import handleImage from '../handleImage'

class category extends React.Component {

    render() {
        const category = this.props.Category;
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    <h2>{category.name}</h2>
                    {category.products.map(product => (
                        <li key={product.__dataID__}>
                            <Link to={'/product/' + product.productId}>{product.vendor.name + " " + product.model}</Link>
                            <img src={handleImage(product.front_image.src)} />
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}


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
