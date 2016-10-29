import React from 'react';
import { Col, NavLink, Card, CardImg, CardHeader, Container } from 'reactstrap';
import handleImage from '../handleImage';
import Style from '../main.scss';

class Vendors extends React.Component {

    render() {
        const vendors = this.props.vendors;
        return (
            <Container className={Style.vendors}>
                {vendors.map(vendor => (
                    <Col sm="6" md={{ size: 2, offset: 0 }} key={vendor.vendorId}>
                        <Card>
                            <NavLink href={`/vendor/${vendor.vendorId}`}>
                                <CardHeader>{vendor.name}</CardHeader>
                                <CardImg width="100%" src={handleImage(vendor.logotype)} alt={vendor.name} />
                            </NavLink>
                        </Card>
                    </Col>
                ))}
            </Container>
        );
    }
}

Vendors.propTypes = {
    vendors: React.PropTypes.array.isRequired
};

export default Vendors;
