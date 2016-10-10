import React from 'react';
import Relay from 'react-relay';

import Header from '../header/header';
import Categories from '../categories/categories';
import Style from './index.scss';
import Config from 'Config'

class index extends React.Component {

    handleImage(name) {

        return `${Config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`
    }

    render() {
        const { vendors } = this.props.Vendor;
        return (
            <div>
                <Header />
                <Categories categories={this.props.Category} />
                <div className={Style.root}>
                    {vendors.map(vendor => (
                        <li key={vendor.__dataID__}>
                            <a href={vendor.vendorId}>{vendor.name}</a>
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
        Vendor: () => Relay.QL`
            fragment on Vendors {
                vendors {
                    vendorId
                    name
                    logotype
                }
            }
        `,
        Category: () => Relay.QL`
            fragment on Categories {
                categories {
                    categoryId
                    name
                    ico
                }
            }
        `,
    }
});
