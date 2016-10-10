import React from 'react';

import { Link } from 'react-router'
import Stylus from './category.scss';

class Categories extends React.Component {

    render() {
        const { categories } = this.props.categories;
        return (
            <div className={Stylus.root}>
                {categories.map(category => (
                    <li key={category.__dataID__}>
                        <Link to={'/categories/' + category.categoryId}>{category.name}</Link>
                    </li>
                ))}
            </div>
        )
    }
}

export default Categories;
