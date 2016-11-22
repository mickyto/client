import React from 'react';
import { InputGroup, InputGroupAddon, Input, Col, Jumbotron, Row } from 'reactstrap';


class filter extends React.Component {

    inArray = function(arr, item) {
        for(var i=0; i < arr.length; i++) {
            if(arr[i] === item) return true;
        }
        return false;
    };


    constructor(props) {
        super(props);
        
        let vendors = [];
        props.products.map(product => {
            
                if (!this.inArray(vendors, product.node.vendor.name)) {
                    vendors.push(product.node.vendor.name);
                }
            }
        );
        this.state = {
            vendors: vendors
        }
    }


    render() {
        const vendors = this.state.vendors;
        return (
            <Jumbotron>
                <p>Price</p>
                <InputGroup>
                    <InputGroupAddon>from</InputGroupAddon>
                    <Input />
                    <InputGroupAddon>to</InputGroupAddon>
                    <Input />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon>On sale</InputGroupAddon>
                    <InputGroupAddon>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                    </InputGroupAddon>
                </InputGroup>
                <br />
                <Row>
                <p>Vendor</p>
                {vendors.map(name => (
                    <Col sm="6" key={name}>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                        <p className="form-check-inline">{name}</p>
                    </Col>
                ))}
                </Row>
                <br />
                <p>Weight</p>
                <InputGroup>
                    <InputGroupAddon>from</InputGroupAddon>
                    <Input />
                    <InputGroupAddon>to</InputGroupAddon>
                    <Input />
                </InputGroup>
                <br />
            </Jumbotron>
        );
    }
}

export default filter;
