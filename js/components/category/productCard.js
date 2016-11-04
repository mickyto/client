import React from 'react';
import { Link } from 'react-router';
import { CardText, DropdownToggle, DropdownMenu, DropdownItem,
    Container, Col, Media, Card, Row, Input, CardTitle } from 'reactstrap';

import Style from '../main.scss';
import handleImage from '../handleImage';

class ProductCard extends React.Component {
    
    render() {
        return (
            <div>
                {this.props.products.map(product => (
                    <Card block outline color="info" key={product.productId}>
                        <div className={Style.image}>
                            <span></span>
                            <img src={ product.front_image !== null ? handleImage(product.front_image.src) : '/images/noImage.png' } alt="front" />
                        </div>
                        <CardTitle>
                            <Link to={`/product/${product.productId}`}>{`${product.vendor.name} ${product.model}`}</Link>
                        </CardTitle>
                        <Col sm={{ size: 4, push: 0, pull: 0 }} className={Style.cardSpec}>
                            {product.specifications.map(spec => {
                                if (spec.value.true === 'no') {
                                    return
                                }
                                return (
                                    <p key={spec.property.name}>{spec.property.name}:&nbsp;
                                        {spec.value.to &&
                                        <span>{spec.value.from}-{spec.value.to} {spec.unit !== null ? spec.unit.abbreviation : ''}</span>
                                        }
                                        {spec.value.value &&
                                        <span>{spec.value.value} {spec.unit !== null ? spec.unit.abbreviation : ''}</span>
                                        }
                                        {spec.value.default_value &&
                                        <span>{spec.value.default_value.name}</span>
                                        }
                                        {spec.value.true &&
                                        <span>{spec.value.true}</span>
                                        }
                                        {spec.value.default_values &&
                                            <span>
                                                {spec.value.default_values.map((value, i, arr) => {
                                                    let divider = i < arr.length - 1 &&
                                                        <span>, </span>;
                                                    return (
                                                        <span key={i}>
                                                            <span>{value.name}</span>{divider}
                                                        </span>
                                                    )
                                                })}
                                            </span>
                                        }
                                    </p>
                                )
                            })}
                            <Col>
                                <Input type="checkbox" />
                                <h6>Add to compare</h6>
                            </Col>
                        </Col>
                        <CardText>{product.description}</CardText>
                    </Card>
                ))}
            </div>
        );
    }
}

export default ProductCard;



