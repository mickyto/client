import React from 'react';
import Relay from 'react-relay';

import Header from '../header/header';
import Stylus from './index.scss';
import Config from 'Config'

class index extends React.Component {

    handleImage(name) {

        return `${Config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`
    }

    render() {
        const { vendors } = this.props.viewer;
        return (
            <div>
                <Header />
                <div className={Stylus.root}>
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
        viewer: () => Relay.QL`
            fragment on Vendors {
                vendors {
                    vendorId
                    name
                    logotype
                }
            }
        `,
    }
});
