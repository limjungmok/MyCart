import React, { Component, PropTypes } from 'react';

class InputUrl extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url : ''
        };

        this.handleSetUrl = this.handleSetUrl.bind(this);
    }

    handleSetUrl(event){
        let url = event.target.value;

        this.setState({
            url : url
        });
    }

    render() {
        return(
            <div>
                <div className="input-field">
                    <input  id="url"
                            className="validate"
                            type="text"
                            value = {this.state.url}
                            onChange = {this.handleSetUrl}/>
                    <label htmlFor="url">Input Url</label>
                </div>
                <button className="waves-effect waves-light btn"
                        onClick = {() =>this.props.handleSubmitUrl(this.state.url)}>
                        분석
                </button>
            </div>
        );
    }
}

export default InputUrl;
