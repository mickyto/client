import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import Dropzone from'react-dropzone';
import { Button } from 'reactstrap';

import Style from '../main.scss';
import { t } from '../../translator';
import config from '../../../config';
import handleImage from '../handleImage';

class Image extends React.Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFront = this.handleFront.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            button: 'secondary',
            image: ''
        };
    }

    onDrop(image) {
        this.setState({
            image: image
        });
    }

    timedIcon(color) {
        this.setState({ button: color });
        setTimeout(() => this.setState({button: 'secondary'}), 4000);
    }

    handleFront() {
        const _this = this;
        axios.post(`${config.apiUrl}events?api_token=${cookie.load('userToken')}`, {
                action: 'update',
                element_type: 'product',
                element_id: this.props.product,
                field: 'images',
                data: {
                    id: this.props.image.id ? this.props.image.id : '',
                    front_image: 'yes'
                }
            })
            .then(() => {
                _this.timedIcon('success');
                _this.props.relay.forceFetch();
            })
            .catch(() => _this.timedIcon('danger'));
    }

    handleDelete() {

        if (!this.props.image) {
            this.setState({ image: '' });
            this.props.isExtraImage(false);
            return;
        }

        const _this = this;
        axios.post(`${config.apiUrl}events?api_token=${cookie.load('userToken')}`, {
                action: 'remove',
                element_type: 'product',
                element_id: this.props.product,
                field: 'images',
                data: {
                    front_image: 'yes',
                    id: this.props.image.id ? this.props.image.id : ''
                }
            })
            .then(() => _this.props.relay.forceFetch())
            .catch(() => _this.timedIcon('danger'));
    }


    handleSave() {

        if (this.state.image === '') {
            this.timedIcon('danger');
            return;
        }

        const _this = this;
        const data = new FormData();
        data.append('file', this.state.image[0]);

        const options = {
            headers: {
                'Content-Type': this.state.image[0].type
            }
        };

        axios.post(`${config.apiUrl}images?api_token=${cookie.load('userToken')}`, data, options)
            .then((res) => {

                axios.post(`${config.apiUrl}events?api_token=${cookie.load('userToken')}`, {
                        action: 'update',
                        element_type: 'product',
                        element_id: _this.props.product,
                        field: 'images',
                        data: {
                            src: res.data.name,
                            front_image: _this.props.isFront ? _this.props.isFront : '',
                            id: _this.props.image && _this.props.image !== null ? _this.props.image.id : ''
                        }
                    })
                    .then(() => {
                        _this.timedIcon('success');
                        _this.props.relay.forceFetch();
                        _this.setState({ image: '' });
                        if (this.props.isExtraImage) {
                            _this.props.isExtraImage(false);
                        }
                    })
                    .catch(() => _this.timedIcon('danger'));
            })
            .catch(() => _this.timedIcon('danger'));
    }

    render() {

        let src;
        if (this.props.image && this.props.image.src && this.state.image === '') {
            src = handleImage(this.props.image.src)
        }
        else if (this.state.image !== '') {
            src = this.state.image[0].preview
        }

        return (
            <div className={Style.martop}>
                <Dropzone accept="image/*" multiple={false} className={Style.dropzone} ref="dropzone" onDrop={this.onDrop} >
                    {this.state.image || this.props.image && this.props.image.src ?
                        <div id="image">
                            <span></span>
                            <img src={src} />
                        </div>
                        :
                        <div id="image">
                            <div id="msg">Drop an image here, or click to select image to upload</div>
                        </div>
                    }
                </Dropzone>
                <div className={Style.middle}>
                    <table>
                        <tbody>
                        <tr><td><Button color={this.state.button} onClick={this.handleSave}>{t('save')}</Button></td></tr>
                        <tr><td><Button color={this.state.button} onClick={this.handleDelete}>Delete</Button></td></tr>
                        {!this.props.isFront && this.props.image  &&
                        <tr><td><Button color={this.state.button} onClick={this.handleFront}>Make front</Button></td></tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Image;
