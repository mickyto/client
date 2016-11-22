import React from 'react';
import Relay from 'react-relay';
import { Table, Card } from 'reactstrap';

import Style from '../main.scss';
import { t } from '../../translator'

class Specifications extends React.Component {

    inArray = function(arr, item) {
        for(var i=0; i < arr.length; i++) {
            if(arr[i] === item) return true;
        }
        return false;
    };

    constructor(props) {
        super(props);

        let groups = [];
        props.specs.specifications.map(spec => {
            if (!this.inArray(groups, spec.property.group.name)) {
                groups.push(spec.property.group.name);
            }
        });

        this.state = { groups }
    }

    render() {
        return (
            <div>
                <h1 className="display-5">{t('specifications')}</h1>
                <br />
                <Card block outline color="info">
                    {this.state.groups.map(group => (
                        <Table key={group} hover className={Style.table}>
                            <thead>
                            <tr><th>{group}</th></tr>
                            </thead>
                            <tbody>
                            {this.props.specs.specifications.map(spec => {
                                if(spec.property.group.name === group) {
                                    return (<tr key={spec.property.name}>
                                        <td>{spec.property.name}</td>

                                        {spec.value.to &&
                                        <td>{spec.value.from}-{spec.value.to} {spec.unit !== null ? spec.unit.abbreviation : ''}</td>
                                        }
                                        {spec.value.value &&
                                        <td>{spec.value.value} {spec.unit !== null ? spec.unit.abbreviation : ''}</td>
                                        }
                                        {spec.value.default_value &&
                                        <td>{spec.value.default_value.name}</td>
                                        }
                                        {spec.value.true &&
                                        <td>{spec.value.true === 'yes' ? '+' : '-'}</td>
                                        }
                                        {spec.value.default_values &&
                                        <td>
                                            {spec.value.default_values.map((value, i, arr) => {
                                                let divider = i < arr.length - 1 &&
                                                    <span className={Style.spec}>,</span>;
                                                return (
                                                    <span key={i}>
                                                        <span className="float-xs-left">{value.name}</span>{divider}
                                                    </span>
                                                )
                                            })}
                                        </td>
                                        }
                                    </tr>)
                                }
                            })}
                            </tbody>
                        </Table>
                    ))}
                </Card>
            </div>
        );
    }
}

export default Relay.createContainer(Specifications, {
    fragments: {
        specs: () => Relay.QL`
            fragment on Product {
                specifications {
                    property {
                        name
                        group {
                            name
                        }
                    }
                    unit {
                        abbreviation
                    }
                    value {
                        ... on SpecEnumType {
                            default_value {
                                name
                            }
                        }
                        ... on SpecIntType {
                            value
                        }
                        ... on SpecSetType {
                            default_values {
                                name
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
