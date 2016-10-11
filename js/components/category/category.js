import React from 'react'
import Relay from 'react-relay';
import { Link } from 'react-router'

import Header from '../header/header';
import Style from './category.scss';
import Config from 'Config'

class category extends React.Component {

    handleImage(name) {

        return `${Config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`
    }

    render() {
        const category = this.props.Category;
        console.log(category);
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    <h2>{category.name}</h2>
                    {category.products.map(product => (
                        <li key={product.__dataID__}>
                            <Link to={product.productId}>{product.vendor.name + " " + product.model}</Link>
                            <img src={this.handleImage(product.front_image.src)} />
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
