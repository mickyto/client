import React from 'react';
import { InputGroup, InputGroupButton, Input, Col } from 'reactstrap';

class Search extends React.Component {
    render() {
        return (
            <div>
                <Col xs="6">
                    <InputGroup>
                        <Input />
                        <InputGroupButton color="secondary">Search</InputGroupButton>
                    </InputGroup>
                </Col>
            </div> 
        );
    }
}

export default Search;