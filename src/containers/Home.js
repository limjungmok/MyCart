import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import { InputUrl, ItemList } from 'components';

const propTypes = {

};

const defaultProps = {

};

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            urlList : []
        };

        this.handleSubmitUrl = this.handleSubmitUrl.bind(this);
    }

    handleSubmitUrl(url){
        this.setState({
            urlList: update(
                this.state.urlList,
                {
                    $push: [url]
                }
            )
        });
        console.log(this.state.urlList);
    }
    render() {
        return(
            <div>
              <InputUrl handleSubmitUrl = {this.handleSubmitUrl}/>
              <ItemList urlList = {this.state.urlList}/>
            </div>
        );
    }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
