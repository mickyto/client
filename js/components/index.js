import chalk from 'chalk';
import React from 'react';
import Relay from 'react-relay';

class StarWarsApp extends React.Component {

    render() {
        const { vendors } = this.props.viewer;
        return (
            <div>
                {vendors.map(vendor => (
                    <li key={vendor.__dataID__}>
                        <h1>{vendor.vendorId}</h1>
                        <h1>{vendor.name}</h1>
                        <h1>{vendor.logotype}</h1>
                    </li>
                ))}
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
