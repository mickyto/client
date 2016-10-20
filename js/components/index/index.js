import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

import Header from '../header/header';
import Categories from '../categories/categories';
import Style from './index.scss';
import handleImage from '../handleImage'

class index extends React.Component {
    
    render() {
        const { vendors } = this.props.viewer;
        return (
            <div>
                <Header />
                <Categories categories={this.props.viewer.categories} />
                <div className={Style.root}>
                    {vendors.map(vendor => (
                        <li key={vendor.__dataID__}>
                            <Link to={'/vendor/' + vendor.vendorId}>{vendor.name}</Link>
                            <img src={handleImage(vendor.logotype)} />
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(index, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                vendors {
                    vendorId
                    name
                    logotype
                }
                categories {
                    categoryId
                    name
                    ico
                }
            }
        `
    }
});
