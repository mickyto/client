import React from 'react';
import Relay from 'react-relay';

import Header from '../header/header';
import Style from './vendor.scss';
import Config from 'Config'

class Vendor extends React.Component {

    handleImage(name) {

        return `${Config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`
    }
    render() {
        const vendor = this.props.Vendor;
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    <h1>{vendor.name}</h1>
                    <img src={this.handleImage(vendor.logotype)} />
                </div>
            </div>
        )
    }
}

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


