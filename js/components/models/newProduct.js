import React from 'react';
import Relay from 'react-relay';

import { Button, Col, ButtonGroup, Breadcrumb, BreadcrumbItem, Input,
    Form, FormGroup, Jumbotron, Label, DropdownItem } from 'reactstrap';

import Style from '../main.scss';
import { t } from '../../translator'

class NewProduct extends React.Component {

    constructor(props) {
        super(props);

        this.handleCategory = this.handleCategory.bind(this);
        this.handleVendor = this.handleVendor.bind(this);
        this.handleModel = this.handleModel.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.state = {
            category: '',
            vendor: '',
            model: '',
            description: ''
        };
    }

    handleCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    handleVendor(e) {
        this.setState({
            vendor: e.target.value
        });
    }

    handleModel(e) {
        this.setState({
            model: e.target.value
        });
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        });
    }


    render() {
        console.log(this.state);
        return (
            <div>
                <Col xs="9">
                    <Col sm="12" md={{ size: 11, offset: 1 }}>
                        <h1 className="display-4">Adding new model</h1>
                    </Col>
                    <Col xs="3">
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
                    <Col xs="9">
                        <Breadcrumb tag="nav">
                            <BreadcrumbItem active tag="span">Basic information and description</BreadcrumbItem>
                            <BreadcrumbItem tag="span">Features and specifications</BreadcrumbItem>
                            <BreadcrumbItem tag="span">Images</BreadcrumbItem>
                        </Breadcrumb>
                        <hr className="my-2" />
                        <Form>
                            <FormGroup>
                                <Label>Category</Label>
                                <Input type="select" name="category" onChange={this.handleCategory}>
                                    <option></option>
                                    {this.props.viewer.categories.map(category => (
                                        <option key={category.categoryId}>{category.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Vendor</Label>
                                <Input type="select" name="vendor" onChange={this.handleVendor}>
                                    <option></option>
                                    {this.props.viewer.vendors.map(vendor => (
                                        <option key={vendor.vendorId}>{vendor.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Model</Label>
                                <Input name="model" onChange={this.handleModel} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input type="textarea" name="description" onChange={this.handleDescription} />
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
