import React, { Component, PropTypes } from 'react';

const propTypes = {

};

const defaultProps = {

};

class Item extends Component {


    render() {
        return(
            <li>
                {this.props.item}
            </li>
        );
    }
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
