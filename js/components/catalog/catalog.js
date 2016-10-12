import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

import Header from '../header/header';
import Style from './catalog.scss';
import config from '../../../config';

class catalog extends React.Component {

    handleImage(name) {
        return `${config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`
    }
    
    render() {
        const { categories } = this.props.Categories;
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    {categories.map(category => (
                        <li key={category.__dataID__}>
                            <Link to={'/category/' + category.categoryId}>{category.name}</Link>
                            <img src={this.handleImage(category.ico)} />
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(catalog, {
    fragments: {
        Categories: () => Relay.QL`
            fragment on Categories {
                categories {
                    categoryId
                    name
                    ico
                }
            }
        `
    }
});
