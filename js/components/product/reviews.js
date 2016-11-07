import React from 'react';
import { Button, Container, Col, Row} from 'reactstrap';
import FaStar from 'react-icons/lib/fa/star'
import FaStarO from 'react-icons/lib/fa/star-o'


import Style from '../main.scss';
import { t } from '../../translator'

class reviews extends React.Component {

    render() {
        return (
            <div>
                <h1 className="display-5">{t('reviews')}</h1>
                <hr className="my-2" />
                <Col sm="6">
                    <Container>
                        <Row>
                            <Col sm="2" className="text-xs-right">
                                <p className="lead">7</p>
                            </Col>
                            <Col sm="6" className="text-xs-left">
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="2" className="text-xs-right">
                                <p className="lead">5</p>
                            </Col>
                            <Col sm="6" className="text-xs-left">
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="2" className="text-xs-right">
                                <p className="lead">6</p>
                            </Col>
                            <Col sm="6" className="text-xs-left">
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="2" className="text-xs-right">
                                <p className="lead">0</p>
                            </Col>
                            <Col sm="6" className="text-xs-left">
                                <FaStar size="30" color="darkgoldenrod" />
                                <FaStar size="30" color="darkgoldenrod" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="2" className="text-xs-right">
                                <p className="lead">0</p>
                            </Col>
                            <Col sm="6" className="text-xs-left">
                                <FaStar size="30" color="darkgoldenrod" />
                            </Col>
                            <Col sm="4" className="text-xs-left">
                                <h1 className={Style.review}>4.5</h1>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col sm="6" className="text-xs-center">
                    <p className="lead">{t('addReviewFor')}: {this.props.productName}</p>
                    <br />
                    <Button size="lg" color="info">{t('addReview')}</Button>
                </Col>
            </div>
        );
    }
}
export default reviews;



