import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    vendors: () => Relay.QL`query { vendors(names: $vendorNames) }`,
  };
  static routeName = 'StarWarsAppHomeRoute';
}
