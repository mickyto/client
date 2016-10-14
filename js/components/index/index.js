import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

import Header from '../header/header';
import Categories from '../categories/categories';
import Style from './index.scss';
import config from '../../../config';

class index extends React.Component {

    handleImage(name) {

        return `${config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`
    }

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
                            <img src={this.handleImage(vendor.logotype)} />
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
