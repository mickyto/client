import React from 'react';
import { InputGroup, InputGroupButton, Input, Col } from 'reactstrap';

import { t } from '../../translator'

class Search extends React.Component {
    render() {
        return (
            <div>
                <Col xs="6">
                    <InputGroup>
                        <Input />
                        <InputGroupButton color="secondary">{t('search')}</InputGroupButton>
                    </InputGroup>
                </Col>
            </div> 
        );
    }
}

export default Search;