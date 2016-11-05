import Relay from 'react-relay';

export default {

    category: {
        Category: () => Relay.QL`query { node (id: $id) }`
    },

    vendor: {
        Vendor: () => Relay.QL`query { node (id: $id) }`
    },

    product: {
        Product: () => Relay.QL`query { node (id: $id) }`
    }
};
