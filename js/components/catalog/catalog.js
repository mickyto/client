import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Card, CardImg, CardDeck, CardTitle, Col} from 'reactstrap';

import Layout from '../layout/layout';
import Style from '../main.scss';
import handleImage from '../handleImage';

class catalog extends React.Component {

    render() {
        const categories = this.props.viewer.categories;
        return (
            <Layout>
                <h1 className="display-4">Catalog</h1>
                <CardDeck className={Style.martop}>
                    {categories.map(category => (
                        <Col sm="3" key={category.categoryId} className={Style.card}>
                            <Link to={`/category/${category.categoryId}`}>
                                <Card block outline color="info">
                                    <CardTitle>{category.name}</CardTitle>
                                    <CardImg top width="100%" src={ category.ico !== null ? handleImage(category.ico) : '/images/noImage.png'} alt='ico' />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </CardDeck>
            </Layout>
        );
    }
}

catalog.propTypes = {
    viewer: React.PropTypes.object.isRequired
};

export default Relay.createContainer(catalog, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                categories {
                    categoryId
                    name
                    ico
                }
            }
        `
    }
});
