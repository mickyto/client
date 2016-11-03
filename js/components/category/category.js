import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Container, Col, Media, Card, Row, Input } from 'reactstrap';

import Header from '../header/header';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import Footer from '../footer/footer';
import Style from '../main.scss';
import handleImage from '../handleImage';

class category extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const categ = this.props.Category;
        console.log(this);
        return (
            <div className={Style.back}>
                <Header />
                <Container className={Style.main}>
                    <h1 className="display-4">{categ.name}</h1>
                    <Col sm="8" className={Style.martop}>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Sort by
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Price</DropdownItem>
                                <DropdownItem>Popularity</DropdownItem>
                                <DropdownItem>Rating</DropdownItem>
                                <DropdownItem>Novelty</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <hr className="my-2" />
                        {categ.products.map(product => (
                            <Card block outline color="info" key={product.productId}>
                                <Media>
                                    <div className={Style.image}>
                                    <span></span>
                                        <img src={ product.front_image !== null ? handleImage(product.front_image.src) : '/images/noImage.png' } alt="front" />

                                        </div>
                                    <Media body>
                                        <Media heading>
                                            <Link to={`/product/${product.productId}`}>{`${product.vendor.name} ${product.model}`}</Link>
                                        </Media>
                                        {product.description}
                                        <Row>
                                        <Col sm={{ size: 4, push: 1, pull: 0 }}>
                                            <Input type="checkbox" aria-label="Checkbox for following text input" />
                                            <p className={Style.sky}>Add to compare</p>
                                        </Col>
                                        </Row>
                                    </Media>
                                </Media>
                            </Card>
                         ))}
                        <Pagination />
                    </Col>
                    <Col sm="4">
                        <Filter products={categ.products} />
                    </Col>
                </Container>
                <Footer />
            </div>
        );
    }
}

category.propTypes = {
    Category: React.PropTypes.object.isRequired
};

export default Relay.createContainer(category, {
    fragments: {
        Category: () => Relay.QL`
            fragment on Category {
                name
                products {
                    productId
                    model
                    description
                    vendor {
                        name
                    }
                    front_image {
                        src
                    }
                }
            }
        `,
    }
});
