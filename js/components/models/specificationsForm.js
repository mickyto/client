import React from 'react';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import Style from '../main.scss';
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

    inArray = function(arr, item) {
        for(var i=0; i < arr.length; i++) {
            if(arr[i] === item) return true;
        }
        return false;
    };

    constructor(props) {
        super(props);

        let groups = [];
        props.specs.category.properties.map(prop => {
            if (!this.inArray(groups, prop.group.name)) {
                groups.push(prop.group.name);
            }
        });

        this.state = { groups };
        props.specs.specifications.map(spec => {
            this.state[spec.property.propertyId] = spec.value;
        })
    }

    render() {
        const properties = this.props.specs.category.properties;
        const id = this.props.specs.productId;
        return (
            <div>
                <p className="lead">{t('specifications')}</p>
                {this.state.groups.map(group => (
                    <div key={group} className={Style.martop}>
                        <h6>{group}</h6>
                        {properties.map(prop => {
                            if (prop.group.name === group) {
                                return (
                                    <div key={prop.name}>
                                    {prop.type === 'PERIOD' &&
                                    <Period prop={prop} product={id} data={this.state[prop.propertyId]}/>
                                    }
                                    {prop.type === 'INTEGER' &&
                                    <Integer prop={prop} product={id} data={this.state[prop.propertyId]}/>
                                    }
                                    {prop.type === 'ENUM' &&
                                    <Enum prop={prop} product={id} data={this.state[prop.propertyId]}/>
                                    }
                                    {prop.type === 'DUAL' &&
                                    <Dual prop={prop} product={id} data={this.state[prop.propertyId]}/>
                                    }
                                    {prop.type === 'SET' &&
                                    <Set prop={prop} product={id} data={this.state[prop.propertyId]}/>
                                    }
                                    </div>
                                )
                            }
                        })}
                    </div>
                ))}
            </div>
        );
    }
}

export default Relay.createContainer(Specifications, {
    fragments: {
        specs: () => Relay.QL`
            fragment on Product {
                productId
                category {
                    properties {
                        propertyId
                        group {
                            name
                        }
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







