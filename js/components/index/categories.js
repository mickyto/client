import React from 'react';
import { Button, ButtonGroup, Col } from 'reactstrap';

class Categories extends React.Component {

    render() {
        const categories = this.props.categories;
        return (
            <Col sm={{ size: 2, offset: 0 }}>
                <ButtonGroup vertical>
                    {categories.map(category => (
                        <Button outline color="primary" size="lg" key={category.categoryId} href={`/category/${category.categoryId}`}>
                            {category.name}
                        </Button>
                    ))}
                </ButtonGroup>
                <hr className="my-2" />
                <Button color="info" href="/catalog" outline size="lg">All categories</Button>{' '}
            </Col>
        );
    }
}

Categories.propTypes = {
    categories: React.PropTypes.array.isRequired
};

export default Categories;
