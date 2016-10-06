import chalk from 'chalk';
import React from 'react';
import Relay from 'react-relay';
//import StarWarsShip from './StarWarsShip';
//import AddShipMutation from '../mutation/AddShipMutation';


class StarWarsApp extends React.Component {

    render() {
        const {vendors} = this.props;
        console.log(typeof vendors);
        return (
            <div>
                {vendors.map(vendor => (
                    <li key={vendor.id}>
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
        vendors: () => Relay.QL`
            fragment on Vendor @relay(plural: true) {
                id,
                vendorId,
                name,
                logotype
            }
        `,
    }
});
