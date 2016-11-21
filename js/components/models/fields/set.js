import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Form, Label, Input, Button } from 'reactstrap';
import MdCheck from 'react-icons/lib/md/check'
import MdClear from 'react-icons/lib/md/clear'

import Style from '../../main.scss';
import { t } from '../../../translator';
import config from '../../../../config';

class Set extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            button: 'secondary',
            values: []
        };
        if (props.data) {
            props.data.default_values.map(value => {
                this.state.values.push(value.defaultValueId)
            })
        }
    }

    timedIcon(color) {
        this.setState({ button: color });
        setTimeout(() => this.setState({ button: 'secondary' }), 4000);
    }

    handleChange(event) {

        const value = parseInt(event.target.value);
        const arr = this.state.values;
        const index = arr.indexOf(value);

        if (index > -1) {
            arr.splice(index, 1);
        }
        else {
            arr.push(value)
        }
        this.setState(this.state)
    }

    handleSave() {

        if (this.state.isHas === '') {
            this.timedIcon('danger');
            return;
        }

        const _this = this;

        axios.post(`${config.apiUrl}events?api_token=${cookie.load('userToken')}`, {
                action: 'update',
                element_type: 'product',
                element_id: this.props.product,
                field: 'specifications',
                data: {
                    value: this.state.values,
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
                            {prop.default_values.map(value => (
                                <Label check key={value.name}>
                                    <Input
                                        type="checkbox"
                                        value={value.defaultValueId}
                                        checked={this.state.values.indexOf(value.defaultValueId) !== -1 }
                                        onChange={this.handleChange}
                                    />{' '}
                                    {value.name}
                                </Label>
                            ))}
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

export default Set;
