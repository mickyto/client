import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
      Vendor: () => Relay.QL`query { vendorViewer }`,
      Category: () => Relay.QL`query { categoryViewer }`
  };
  static routeName = 'indexRoute';
}
