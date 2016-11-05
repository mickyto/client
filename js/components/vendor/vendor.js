import React from 'react';
import Relay from 'react-relay';

import Header from '../layout/header';
import handleImage from '../handleImage';


class Vendor extends React.Component {

    render() {
        const vendor = this.props.Vendor;
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    <h1>{vendor.name}</h1>
                    <img src={handleImage(vendor.logotype)} alt='logotype' />
                </div>
            </div>
        );
    }
}

Vendor.propTypes = {
    Vendor: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Vendor, {
    fragments: {
        Vendor: () => Relay.QL`
            fragment on Vendor {
                name
                logotype
            }
        `,
    }
});
