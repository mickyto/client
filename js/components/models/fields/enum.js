import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Form, Label, Input, Button } from 'reactstrap';
import MdCheck from 'react-icons/lib/md/check'
import MdClear from 'react-icons/lib/md/clear'

import Style from '../../main.scss';
import { t } from '../../../translator';
import config from '../../../../config';


class Enum extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            button: 'secondary',
            defaultValueId: props.data && props.data.default_value !== null ? props.data.default_value.defaultValueId : ''
        };
    }

    timedIcon(color) {
        this.setState({ button: color });
        setTimeout(() => this.setState({ button: 'secondary' }), 4000);
    }

    handleChange(event) {
        this.setState({
            defaultValueId: parseInt(event.target.value)
        });
    }

    handleSave() {

        if (
            this.state.defaultValueId === '' ||
            this.props.data && this.props.data.default_value !== null &&
            this.props.data.default_value.defaultValueId === this.state.defaultValueId
        ) {
            this.timedIcon('danger');
            return;
        }

        const _this = this;

        axios.post(`${config.apiUrl}events?api_token=${cookie.load('userToken')}`, {
                action: 'update',
                element_type: 'product',
                element_id: this.props.data.product,
                field: 'specifications',
                data: {
                    value: {
                        default_value: this.state.defaultValueId
                    },
                    id_property: this.props.prop.propertyId
                }
            })
            .then(() => _this.timedIcon('success'))
            .catch(() => _this.timedIcon('danger'));
    }

    render() {
        const prop = this.props.prop;
        return (
            <table className={Style.period}>
                <tbody>
                <tr>
                    <td id="label">
                        <Label>{prop.name}</Label>
                    </td>
                    <td id="input">
                        <Form inline >
                            <Input type="select" name="select" value={this.state.defaultValueId} onChange={this.handleChange} >
                                <option></option>
                                {prop.default_values.map(value => (
                                    <option key={value.name} value={value.defaultValueId}>{value.name}</option>
                                ))}
                            </Input>
                        </Form>
                    </td>
                    <td id="button">
                        <Button onClick={this.handleSave} color={this.state.button} size="sm">{t('save')}</Button>
                        {this.state.button === 'success' &&
                        <MdCheck className={Style.success} />
                        }
                        {this.state.button === 'danger' &&
                        <MdClear className={Style.danger} />
                        }
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default Enum;
