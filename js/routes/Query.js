import Relay from 'react-relay';

export default {
    
    index: {
        Vendor: () => Relay.QL`query { vendorViewer }`,
        Category: () => Relay.QL`query { categoryViewer }`
    },

    catalog: {
        Categories: () => Relay.QL`query { categoryViewer }`
    },
    
    category: {
        Category: () => Relay.QL`query { category (id: $id) }`
    },
    
    vendor: {
        Vendor: () => Relay.QL`query { vendor (id: $id) }`
    },

    product: {
        Product: () => Relay.QL`query { product (id: $id) }`
    }
    
};