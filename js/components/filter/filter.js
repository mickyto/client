import React from 'react';
import { InputGroup, InputGroupAddon, Input, DropdownItem,
    Container, Col, Media, Jumbotron} from 'reactstrap';


class filter extends React.Component {

    render() {
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
                <p>Vendor</p>
                <Col sm="6">
                    <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                    <small>  Makita</small>
                    </Col>
                <Col sm="6">
                    <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                    <small>  Hilti</small>
                </Col>
                <br />
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
