import React from 'react';
import { Link } from 'react-router';
import { CardText, Col, Card, Input, CardTitle } from 'reactstrap';

import Style from '../main.scss';
import handleImage from '../handleImage';
import { t } from '../../translator'

class ProductCard extends React.Component {

    render() {
        return (
            <div>
                {this.props.products.map(product => (
                    <Card block outline color="info" key={product.node.productId}>
                        <Link to={`/product/${product.node.productId}`}>
                            <div style={{width: '150px', height: '150px'}} className={Style.image}>
                                <span></span>
                                <img style={{maxWidth: '150px', maxHeight: '150px'}} src={ product.node.front_image !== null ? handleImage(product.node.front_image.src) : '/images/noImage.png' } alt="front" />
                            </div>
                        </Link>
                        <CardTitle>
                            <Link to={`/product/${product.node.productId}`}>{`${product.node.vendor.name} ${product.node.model}`}</Link>
                        </CardTitle>
                        <Col sm={{ size: 4, push: 0, pull: 0 }} className={Style.cardSpec}>
                            {product.node.specifications.map(spec => {
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
                                <h6>{t('addToCompare')}</h6>
                            </Col>
                        </Col>
                        <CardText>{product.node.description}</CardText>
                    </Card>
                ))}
            </div>
        );
    }
}

export default ProductCard;



