import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Container, Col, Media, Jumbotron} from 'reactstrap';

import Header from '../header/header';
import Filter from '../filter/filter';
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
                        <Media key={product.productId}>
                            <Media left href={`/product/${product.productId}`}>
                                <Media object src={handleImage(product.front_image.src)} className={Style.media} alt="front" />
                            </Media>
                            <Media body>
                                <Media heading>
                                    <Link to={`/product/${product.productId}`}>{`${product.vendor.name} ${product.model}`}</Link>
                                </Media>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                            </Media>
                        </Media>
                         ))}
                    </Col>
                    <Col sm="4">
                        <Filter />
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
