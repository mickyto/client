import React from 'react';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import { t } from '../../translator'
import Period from './fields/period'
import Integer from './fields/integer'
import Enum from './fields/enum'
import Dual from './fields/dual'
import Set from './fields/set'

class Specifications extends React.Component {

    componentDidMount() {
        if (!cookie.load('userToken')) {
            browserHistory.push('/login');
        }
    }

    constructor(props) {
        super(props);

        this.state = {};
        props.productSpecs.specifications.map(spec => {
            this.state[spec.property.propertyId] = spec.value;
        })
    }

    render() {
        const properties = this.props.productSpecs.category.properties;
        const id = this.props.productSpecs.productId;
        return (
            <div>
                <p className="lead">{t('specifications')}</p>
                {properties.map(prop => (
                    <div key={prop.name}>
                        {prop.type === 'PERIOD' &&
                        <Period prop={prop} product={id} data={this.state[prop.propertyId]} />
                        }
                        {prop.type === 'INTEGER' &&
                        <Integer prop={prop} product={id} data={this.state[prop.propertyId]} />
                        }
                        {prop.type === 'ENUM' &&
                        <Enum prop={prop} product={id} data={this.state[prop.propertyId]} />
                        }
                        {prop.type === 'DUAL' &&
                        <Dual prop={prop} product={id} data={this.state[prop.propertyId]} />
                        }
                        {prop.type === 'SET' &&
                        <Set prop={prop} product={id} data={this.state[prop.propertyId]} />
                        }
                    </div>
                ))}
            </div>
        );
    }
}

export default Relay.createContainer(Specifications, {
    fragments: {
        productSpecs: () => Relay.QL`
            fragment on Product {
                productId
                category {
                    properties {
                        propertyId
                        unit {
                            abbreviation
                            unitId
                        }
                        type
                        name
                        default_values {
                            defaultValueId
                            name
                        }
                    }
                }
                specifications {
                    property {
                        propertyId
                    }
                    value {
                        __typename
                        ... on SpecEnumType {
                            default_value {
                                defaultValueId
                            }
                        }
                        ... on SpecIntType {
                            value
                        }
                        ... on SpecSetType {
                            default_values {
                                defaultValueId
                            }
                        }
                        ... on SpecPeriodType {
                            to
                            from
                        }
                        ... on SpecDualType {
                            true
                        }
                    }
                }
            }
        `
    }
});







