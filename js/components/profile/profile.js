import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { Jumbotron, Col } from 'reactstrap';

import { t } from '../../translator'

class Profile extends React.Component {

    componentDidMount() {
        if (!cookie.load('userToken')) {
            browserHistory.push('/login');
        }
    }

    render() {
        return (
            <div>
                <h1 className="display-4">Profile</h1>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Jumbotron>
                        <p className="lead">{t('noMatch')}</p>
                    </Jumbotron>
                </Col>
            </div>
        )
    }
}

export default Profile;
