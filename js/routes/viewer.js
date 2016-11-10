import Relay from 'react-relay';

export default {
    viewer: (Component, {id}) => Relay.QL`
        query {
            viewer (locale: $locale) {
                ${Component.getFragment('viewer', { id: id })}
            }
        }
    `
};
