import React from 'react';
import FaStar from 'react-icons/lib/fa/star'
import { Table, Container, Col, Row} from 'reactstrap';
import FaStarO from 'react-icons/lib/fa/star-o'
import Style from '../main.scss';

class userReview extends React.Component {

    render() {
        return (
            <Container>
                <Col sm="4">
                    <h2 className="display-5">User name</h2>
                    <Row>
                        <Col className="text-xs-left">
                            <FaStar color="darkgoldenrod" size="25" />
                            <FaStar color="darkgoldenrod" size="25" />
                            <FaStar color="darkgoldenrod" size="25" />
                            <FaStar color="darkgoldenrod" size="25" />
                            <FaStarO color="darkgoldenrod" size="25" />
                        </Col>
                    </Row>
                    <br />
                    <p className="lead">10.12.2016</p>
                </Col>
                <Col sm="8">
                    <h3>Good tool</h3>
                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.</p>
                    <Table size="sm" className={Style.table}>
                        <tbody>
                        <tr>
                            <th>Utility</th>
                            <td>4/5</td>
                        </tr>
                        <tr>
                        <th>Price and quality</th>
                            <td>4/5</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
             </Container>
        );
    }
}

export default userReview;