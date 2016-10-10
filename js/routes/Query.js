import Relay from 'react-relay';

export default {
    
    index: {
        Vendor: () => Relay.QL`query { vendorViewer }`,
        Category: () => Relay.QL`query { categoryViewer }`
    },

    catalog: {
        Categories: () => Relay.QL`query { categoryViewer }`
    }
};