import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Form, Label, Input, Button } from 'reactstrap';
import MdCheck from 'react-icons/lib/md/check'
import MdClear from 'react-icons/lib/md/clear'

import Style from '../../main.scss';
import { t } from '../../../translator';
import config from '../../../../config';

class Dual extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            button: 'secondary',
            isHas: props.data ? props.data.true : ''
        }
    }

    timedIcon(color) {
        this.setState({ button: color });
        setTimeout(() => this.setState({ button: 'secondary' }), 4000);
    }

    handleChange(event) {
        this.setState({
            isHas: event.target.value === this.state.isHas ? '' : event.target.value
        })
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
                    value: this.state.isHas,
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
                            <Label id="label">
                                <Input type="radio" value="yes" checked={this.state.isHas === 'yes'} onChange={this.handleChange} />{' '}
                                {t('yes')}
                            </Label>
                            <Label check>
                                <Input type="radio" value="no" checked={this.state.isHas === 'no'} onChange={this.handleChange} />{' '}
                                {t('no')}
                            </Label>
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

export default Dual;