import React from 'react';
import Relay from 'react-relay';
import axios from 'axios';
import cookie from 'react-cookie';
import { FormGroup, Input, Button, Table } from 'reactstrap';

import Style from '../../main.scss';
import { t } from '../../../translator';
import config from '../../../../config';

class Features extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            button: 'secondary',
            id: '',
            text: '',
            isEdit: false
        };
    }

    timedIcon(color) {
        this.setState({ button: color });
        setTimeout(() => this.setState({ button: 'secondary' }), 4000);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    handleEdit(id, text) {
        this.setState({
            isEdit: true,
            id,
            text
        });
    }

    handleInput() {
        this.setState({
            isEdit: false,
            id: '',
            text: ''
        });
    }

    handleSave(event) {

        event.preventDefault();
        
        if (this.state.text === '') {
            this.timedIcon('danger');
            return;
        }

        const _this = this;

        const locale = cookie.load('locale');

        axios.post(`${config.apiUrl}events?api_token=${cookie.load('userToken')}`, {
                locale: locale && locale.alias !== 'en_EN' ? 'ru_RU' : 'default',
                action: event.target.id === 'delete' ? 'remove' : 'update',
                element_type: 'product',
                element_id: this.props.features.productId,
                field: 'features',
                data: {
                    id: this.state.id,
                    feature: this.state.text
                }
            })
            .then(() => {
                _this.setState({ id: '', text: '' });
                _this.timedIcon('success');
                _this.props.relay.forceFetch({ locale: locale.alias });
            })
            .catch(() => _this.timedIcon('danger'));
    }

    render() {
        const features = this.props.features.features;
        return (
            <div className={Style.features}>
                <p className="lead">Features</p>
                <Table hover>
                    <tbody>
                    {features.map((feature, i) => (
                        <tr key={feature.id}>
                            <th>{i + 1}</th>
                            <td className="text-xs-right">
                                { this.state.isEdit && this.state.id === feature.id ? (
                                    <div>
                                        <FormGroup>
                                            <Input type="textarea" value={this.state.text}  onChange={this.handleChange} />
                                        </FormGroup>
                                        <Button id="delete" onClick={this.handleSave} size="sm">{t('delete')}</Button>
                                        {' '}
                                        <Button onClick={this.handleSave} color={this.state.button} size="sm">{t('save')}</Button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-xs-left">{feature.feature}</p>
                                        <Button onClick={() => this.handleEdit(feature.id, feature.feature)} size="sm">Edit</Button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <th>{features.length + 1}</th>
                        <td className="text-xs-right">
                            <FormGroup>
                                <Input type="textarea" value={!this.state.isEdit ? this.state.text : ''} onFocus={this.handleInput} onChange={this.handleChange} />
                            </FormGroup>
                            <Button disabled={this.state.isEdit} color={this.state.button} onClick={this.handleSave} size="sm">Add</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Relay.createContainer(Features, {

    initialVariables: { locale: '' },

    fragments: {
        features: () => Relay.QL`
            fragment on Product {
                productId
                features (locale: $locale) {
                    id
                    feature
                }
            }
        `
    }
});

