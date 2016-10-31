import React from 'react';
import { Container, Col, Row, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import FaStar from 'react-icons/lib/fa/star'
import FaStarHalfEmpty from 'react-icons/lib/fa/star-half-empty'

class review extends React.Component {

    render() {
        return (
            <Container>
            <Row>
                <Col sm="4" className="text-xs-right">
                    <FaStar size="30" color="darkgoldenrod" />
                    <FaStar size="30" color="darkgoldenrod" />
                    <FaStar size="30" color="darkgoldenrod" />
                    <FaStar size="30" color="darkgoldenrod" />
                    <FaStarHalfEmpty size="30" color="darkgoldenrod" />
                </Col>
                <Col sm="5">
                    <p className="lead">4.5 (4 customer reviews)</p>
                </Col>
                <Col sm="3">
                    <InputGroup>
                        <InputGroupAddon>
                            <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                        </InputGroupAddon>
                        <InputGroupAddon>Add to compare</InputGroupAddon>
                    </InputGroup>
                </Col>

            </Row>
            </Container>
        );
    }
}

export default review;


