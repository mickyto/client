import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Form, Label, Input, Button, InputGroup,
    InputGroupAddon } from 'reactstrap';
import MdCheck from 'react-icons/lib/md/check'
import MdClear from 'react-icons/lib/md/clear'

import Style from '../../main.scss';
import { t } from '../../../translator';
import config from '../../../../config';

class Period extends React.Component {

    constructor(props) {
        super(props);

        this.handleFrom = this.handleFrom.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            button: 'secondary',
            from: props.data ? props.data.from : '',
            to: props.data ? props.data.to : ''
        }
    }

    timedIcon(color) {
        this.setState({ button: color });
        setTimeout(() => this.setState({ button: 'secondary' }), 4000);
    }

    handleFrom(event) {
        this.setState({
            from: parseInt(event.target.value)
        });
    }

    handleTo(event) {
        this.setState({
            to: parseInt(event.target.value)
        });
    }

    handleSave() {

        if (this.state.from === '' || this.state.to === '') {
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
                    value: {
                        to: this.state.to,
                        from: this.state.from
                    },
                    id_unit: this.props.prop.unit !== null ? this.props.prop.unit.unitId : '',
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
                            <InputGroup>
                                <InputGroupAddon>{t('from')}</InputGroupAddon>
                                <Input value={this.state.from} onChange={this.handleFrom} />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>{t('to')}</InputGroupAddon>
                                <Input value={this.state.to} onChange={this.handleTo} />
                            </InputGroup>
                            {prop.unit !== null &&
                            <span>{prop.unit.abbreviation}</span>
                            }
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

export default Period;
