import Relay from 'react-relay';

export default {

    category: {
        Category: () => Relay.QL`query { category (id: $id) }`
    },

    vendor: {
        Vendor: () => Relay.QL`query { vendor (id: $id) }`
    },

    product: {
        Product: () => Relay.QL`query { product (id: $id) }`
    },

    viewer: {
        viewer: (Component) => Relay.QL`
            query {
                viewer (locale: $locale) {
                    ${Component.getFragment('viewer')}
                }
            }
        `
    }
};
