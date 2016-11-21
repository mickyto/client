import React from 'react';
import Relay from 'react-relay';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { Button, Col, ButtonGroup, Breadcrumb, BreadcrumbItem, Input,
    Form, FormGroup, Jumbotron, Label, Alert } from 'reactstrap';

import Style from '../main.scss';
import { t } from '../../translator'
import config from '../../../config';

class NewProduct extends React.Component {

    componentDidMount() {
        if (!cookie.load('userToken')) {
            browserHistory.push('/login');
        }
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValue = this.handleValue.bind(this);
        this.state = {
            category: '',
            vendor: '',
            model: '',
            alert: { visible: false }
        };

    }

    handleValue(event, field) {
        let state = {};
        state[field] = event.target.value;
        this.setState(state);
    }

    handleSubmit(event) {

        event.preventDefault();

        const _this = this;

        axios.post(`${config.apiUrl}products/?api_key=${cookie.load('userToken')}`, {
                id_category: this.state.category,
                id_vendor: this.state.vendor,
                model: this.state.model
            })
            .then(function (res) {
                browserHistory.push(`/profile/models/${res.data.id}/specifications`);
                window.location.reload();
            })
            .catch(function (error) {
                if (error.response.data.error) {
                    _this.setState({
                        alert: { visible: true, msg: t(`error_${error.response.data.error.error_code}`) }
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <Col xs="9">
                    <h1 className="display-4">Adding new model</h1>
                    <Col xs="3" className={Style.martop}>
                        <ButtonGroup vertical>
                            <Button outline color="info" size="lg" href="#">
                                My account
                            </Button>
                            <Button outline color="info" size="lg" href="#">
                                My models
                            </Button>
                            <Button outline color="info" size="lg" href="#">
                                My stores
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs="9" className={Style.martop}>
                        <Breadcrumb tag="nav">
                            <BreadcrumbItem active tag="span">Basic information</BreadcrumbItem>
                            <BreadcrumbItem tag="span">Description and specifications</BreadcrumbItem>
                            <BreadcrumbItem tag="span">Images</BreadcrumbItem>
                        </Breadcrumb>
                        <hr className="my-2" />
                        <Alert color="danger" isOpen={this.state.alert.visible}>{this.state.alert.msg}</Alert>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Category</Label>
                                <Input type="select" name="category" onChange={(event) => this.handleValue(event,'category')}>
                                    <option></option>
                                    {this.props.viewer.categories.map(category => (
                                        <option value={category.categoryId} key={category.categoryId}>{category.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Vendor</Label>
                                <Input type="select" name="vendor" onChange={(event) => this.handleValue(event,'vendor')}>
                                    <option></option>
                                    {this.props.viewer.vendors.map(vendor => (
                                        <option value={vendor.vendorId} key={vendor.vendorId}>{vendor.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Model</Label>
                                <Input name="model" onChange={(event) => this.handleValue(event,'model')} />
                            </FormGroup>
                            <FormGroup check>
                                <Button>Next</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Col>
                <Col sm="3">
                    <Jumbotron>
                        <h1 className="display-3">Some add</h1>
                        <Button color="primary">Learn More</Button>
                    </Jumbotron>
                </Col>
            </div>
        );
    }
}

export default Relay.createContainer(NewProduct, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                vendors {
                    vendorId
                    name
                }
                categories {
                    categoryId
                    name
                }
            }
        `
    }
});
