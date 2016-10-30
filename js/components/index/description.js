import React from 'react';
import { Jumbotron, Button, Col } from 'reactstrap';

const Description = () => {
    return (
        <Col xs="6">
            <Jumbotron>
                <img src="images/goods.png" width="100%" />
                <h1 className="display-3">Wikicatalog</h1>
                <p className="lead">We collect information about 4 500 industrial tools and equipment</p>
                <hr className="my-2" />
                <Button size="lg" color="primary">Add Product</Button>
            </Jumbotron>
        </Col>
    );
};

export default Description;
