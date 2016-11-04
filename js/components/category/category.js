import React from 'react';
import Relay from 'react-relay';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Container, Col } from 'reactstrap';

import Header from '../header/header';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import ProductCard from './productCard';
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
                        <ProductCard products={categ.products} />
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
                    specifications {
                        property {
                            name
                        }
                        unit {
                            abbreviation
                        }
                        value {
                            ... on SpecEnumType {
                                default_value {
                                    name
                                }
                            }
                            ... on SpecIntType {
                                value
                            }
                            ... on SpecSetType {
                                default_values {
                                    name
                                }
                            }
                            ... on SpecPeriodType {
                                to
                                from
                            }
                            ... on SpecDualType {
                                true
                            }
                        }
                    }
                }
            }
        `,
    }
});
