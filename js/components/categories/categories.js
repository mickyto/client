import React from 'react';
import { Link } from 'react-router';

import Stylus from './categories.scss';

class Categories extends React.Component {

    render() {
        const categories = this.props.categories;
        return (
            <div className={Stylus.root}>
                {categories.map(category => (
                    <li key={category.categoryId}>
                        <Link to={`/category/${category.categoryId}`}>{category.name}</Link>
                    </li>
                ))}
            </div>
        );
    }
}

Categories.propTypes = {
    categories: React.PropTypes.array.isRequired
};

export default Categories;
