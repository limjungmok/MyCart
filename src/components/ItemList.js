import React, { Component, PropTypes } from 'react';
import Item from './Item';

const propTypes = {

};

const defaultProps = {

};

class ItemList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const mapToItemList = this.props.urlList.map((item, i) =>{
            return (<Item item = {item}
                           key = {i}/>);
        });

        return(
            <ul>
                {mapToItemList}
            </ul>
        );
    }
}

ItemList.propTypes = propTypes;
ItemList.defaultProps = defaultProps;

export default ItemList;
