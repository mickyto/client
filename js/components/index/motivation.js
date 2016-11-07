import React from 'react';
import { Jumbotron, Button, Col } from 'reactstrap';

import Style from '../main.scss';
import { t } from '../../translator'

const Motivation = () => {
    return (
        <Col xs="4">
            <Jumbotron>
                <p className="lead">{t('motivationMsg')}</p>
                <hr className="my-2" />
                <Col sm="4">
                    <div className={Style.img}>
                        <img src="images/notebook.png" />
                        <p className="small">{t('completeForm')}</p>
                    </div>
                </Col>
                <Col sm="4">
                    <div className={Style.img}>
                        <img src="images/ball.png" />
                        <p className="small">{t('findBuyers')}</p>
                    </div>
                </Col>
                <Col sm="4">
                    <div className={Style.img}>
                        <img src="images/watch.png" />
                        <p className="small">{t('sellFaster')}</p>
                    </div>
                </Col>
                <hr className="my-2" />
                <Button size="lg" color="info" block>{t('addStoreFree')}</Button>
            </Jumbotron>
        </Col>
    );
};

export default Motivation;



