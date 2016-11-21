import React from 'react';
import Relay from 'react-relay';

import handleImage from '../handleImage';
import Style from '../main.scss';

class Images extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeImage: props.images.front_image !== null ? handleImage(props.images.front_image.src) : '/images/noImage.png'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(src) {
        this.setState({ activeImage: handleImage(src) })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div style={{width: '440px', height: '440px'}} className={Style.image}>
                    <span></span>
                    <img
                        style={{maxWidth: '440px', maxHeight: '440px'}}
                        src={this.state.activeImage}
                        alt='front'
                    />
                </div>
                <div className={Style.martop}>
                    {this.props.images.images.map(image => (
                        <div style={{width: '100px', height: '100px', float:'left', cursor: 'pointer'}}
                             onClick={() => this.handleChange(image.src)} className={Style.image} key={image.__dataID__}>
                            <span></span>
                            <img style={{maxWidth: '100px', maxHeight: '100px'}} src={handleImage(image.src)} alt='front' />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(Images, {

    fragments:  {
        images: () => Relay.QL`
            fragment on Product {
                front_image {
                    src
                }
                images {
                    src
                }
            }
        `
    }
});



