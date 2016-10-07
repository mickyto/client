import React from 'react';
import Stylus from './category.scss';

class Categories extends React.Component {

    render() {
        const { categories } = this.props.categories;
        return (
            <div className={Stylus.root}>
                {categories.map(category => (
                    <li key={category.__dataID__}>
                        <a href={category.vendorId}>{category.name}</a>
                    </li>
                ))}
            </div>
        )
    }
}

export default Categories;
