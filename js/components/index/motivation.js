import React from 'react';
import { Jumbotron, Button, Col } from 'reactstrap';
import Style from '../main.scss';

const Motivation = () => {
    return (
        <Col xs="4">
            <Jumbotron>
                <p className="lead">Do you want to sell online? Just add link to your price list and you are in.</p>
                <hr className="my-2" />
                <Col sm="4">
                    <div className={Style.img}>
                        <img src="images/notebook.png" />
                        <p className="small">Complete the simple form</p>
                    </div>
                </Col>
                <Col sm="4">
                    <div className={Style.img}>
                        <img src="images/ball.png" />
                        <p className="small">Find buyers around the world</p>
                    </div>
                </Col>
                <Col sm="4">
                    <div className={Style.img}>
                        <img src="images/watch.png" />
                        <p className="small">Sell faster and more efficiently</p>
                    </div>
                </Col>
                <hr className="my-2" />
                <Button size="lg" color="info" block>Add store Free</Button>
            </Jumbotron>
        </Col>
    );
};

export default Motivation;



