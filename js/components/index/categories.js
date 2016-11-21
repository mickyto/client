import React from 'react';
import { Button, ButtonGroup, Col } from 'reactstrap';

import { t } from '../../translator'

class Categories extends React.Component {

    render() {
        const categories = this.props.categories;
        return (
            <Col xs="2">
                <ButtonGroup vertical>
                    {categories.map(category => (
                        <Button outline color="info" size="lg" key={category.categoryId} href={`/category/${category.categoryId}`}>
                            {category.name}
                        </Button>
                    ))}
                </ButtonGroup>
                <hr className="my-2" />
                <Button color="info" href="/catalog" size="lg">{t('allCategories')}</Button>{' '}
            </Col>
        );
    }
}

Categories.propTypes = {
    categories: React.PropTypes.array.isRequired
};

export default Categories;
