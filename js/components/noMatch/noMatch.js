import React from 'react';
import { Jumbotron, Col } from 'reactstrap';

import { t } from '../../translator'

const NoMatch = () => {
    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Jumbotron>
                <p className="lead">{t('noMatch')}</p>
                
            </Jumbotron>
        </Col>
    );
};

export default NoMatch;


