import chalk from 'chalk';
import React from 'react';
import Relay from 'react-relay';

import Header from './header';

class StarWarsApp extends React.Component {

    render() {
        const { vendors } = this.props.viewer;
        return (
            <div>
                <Header title="Skukit Home"/>
                <div>
                    {vendors.map(vendor => (
                        <li key={vendor.__dataID__}>
                            <h1>{vendor.vendorId}</h1>
                            <h1>{vendor.name}</h1>
                            <h1>{vendor.logotype}</h1>
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(StarWarsApp, {
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
