import React from 'react';
//import stylus from './header.scss';

class Categories extends React.Component {

    render() {
        const { categories } = this.props.categories;
        return (
            <div>
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
