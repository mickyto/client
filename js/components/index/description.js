import React from 'react';
import { Jumbotron, Button, Col } from 'reactstrap';

import { t } from '../../translator'

const Description = () => {
    return (
        <Col xs="6">
            <Jumbotron>
                <img src="images/goods.png" width="100%" />
                <h1 className="display-3">{t('wikiCatalog')}</h1>
                <p className="lead">{t('weCollect')}</p>
                <hr className="my-2" />
                <Button size="lg" color="primary">{t('addProduct')}</Button>
            </Jumbotron>
        </Col>
    );
};

export default Description;
