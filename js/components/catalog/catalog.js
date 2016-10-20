import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

import Header from '../header/header';
import Style from './catalog.scss';
import handleImage from '../handleImage'

class catalog extends React.Component {

    render() {
        const categories = this.props.viewer.categories;
        return (
            <div>
                <Header />
                <p>iuuuuj</p>
                <div className={Style.root}>
                    {categories.map(category => (
                        <li key={category.__dataID__}>
                            <Link to={'/category/' + category.categoryId}>{category.name}</Link>
                            <img src={handleImage(category.ico)} />
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}


export default Relay.createContainer(catalog, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                categories {
                    categoryId
                    name
                    ico
                }
            }
        `
    }
});
