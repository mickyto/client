import React from 'react';
import Relay from 'react-relay';

import { t } from '../../translator'

class Features extends React.Component {

    render() {
        return (
            <div>
                <h1 className="display-5">{t('features')}</h1>
                <br />
                {this.props.features.features.map(feature => (
                    <div key={feature.__dataID__}>
                        <p>{feature.feature}</p>
                        <br />
                    </div>
                ))}
            </div>
        );
    }
}

export default Relay.createContainer(Features, {
    fragments:  {
        features: id => Relay.QL`
            fragment on Product {
                features {
                    feature
                }
            }
        `
    }
});







