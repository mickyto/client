import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Card, CardImg, CardDeck,
    CardTitle, Container, Col} from 'reactstrap';

import Header from '../header/header';
import Footer from '../footer/footer';
import Style from '../main.scss';
import handleImage from '../handleImage';

class catalog extends React.Component {

    render() {
        const categories = this.props.viewer.categories;
        return (
            <div className={Style.back}>
                <Header />
                <Container className={Style.main}>
                    <h1 className="display-4">Catalog</h1>
                    <CardDeck className={Style.category}>
                        {categories.map(category => (
                            <Col sm="3" key={category.categoryId} className={Style.card}>
                                <Link to={`/category/${category.categoryId}`}>
                                    <Card block outline color="info">
                                        <CardTitle>{category.name}</CardTitle>
                                        <CardImg top width="100%" src={handleImage(category.ico)} alt='ico' />
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </CardDeck>
                </Container>
                <Footer />
            </div>
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
