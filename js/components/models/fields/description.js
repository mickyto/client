import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Form, Input, Button, FormGroup } from 'reactstrap';
import MdCheck from 'react-icons/lib/md/check'
import MdClear from 'react-icons/lib/md/clear'

import Style from '../../main.scss';
import { t } from '../../../translator';
import config from '../../../../config';


class Description extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            button: 'secondary',
            value: props.data && props.data !== null ? props.data : ''
        };
    }

    timedIcon(color) {
        this.setState({ button: color });
        setTimeout(() => this.setState({ button: 'secondary' }), 4000);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSave(event) {

        event.preventDefault();

        if (this.state.value === '') {
            this.timedIcon('danger');
            return;
        }

        const _this = this;
        const locale = cookie.load('locale');

        axios.post(`${config.apiUrl}events?api_token=${cookie.load('userToken')}`, {
                locale: locale && locale.alias !== 'en_EN' ? 'ru_RU' : '',
                action: 'update',
                element_type: 'product',
                element_id: this.props.product,
                field: 'description',
                data: {
                    description: this.state.value
                }
            })
            .then(() => _this.timedIcon('success'))
            .catch(() => _this.timedIcon('danger'));
    }

    render() {
        return (
            <div>
                <p className="lead">Description</p>
                <Form className="text-xs-right">
                    <FormGroup>
                        <Input type="textarea" name="description" value={this.state.value} onChange={this.handleChange} />
                    </FormGroup>
                    <Button onClick={this.handleSave} color={this.state.button} size="sm">{t('save')}</Button>
                    {this.state.button === 'success' &&
                    <MdCheck className={Style.success} />
                    }
                    {this.state.button === 'danger' &&
                    <MdClear className={Style.danger} />
                    }
                </Form>
            </div>
        )
    }
}

export default Description;



