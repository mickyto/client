import React from 'react';
import Relay from 'react-relay';

import Header from '../header/header';
import Style from './catalog.scss';
import Config from 'Config'

class catalog extends React.Component {

    handleImage(name) {
        return `${Config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`
    }
    
    render() {
        const { categories } = this.props.Categories;
        return (
            <div>
                <Header />
                <div className={Style.root}>
                    {categories.map(category => (
                        <li key={category.__dataID__}>
                            <a href={category.categoryId}>{category.name}</a>
                            <img src={this.handleImage(category.ico)} />
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}
//

export default Relay.createContainer(catalog, {
    fragments: {
        Categories: () => Relay.QL`
            fragment on Categories {
                categories {
                    categoryId
                    name
                    ico
                }
            }
        `
    }
});
