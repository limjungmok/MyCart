import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

const propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};

const defaultProps = {
    mode: true,
    onLogin: (id, pw) => {
        console.error("login function not defined");
    },
    onRegister: (id, pw) => {
        console.error("register function not defined");
    }
};

class Authentication extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name);
        console.log(event.target.value);

        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        let id = this.state.userId;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then((success) => {
            if (!success) {
                this.setState({password: ''});
            }
        });
    }

    handleSignUp() {
        let id = this.state.userId;
        let pw = this.state.password;

        this.props.onSignUp(id, pw).then((result) => {
            if (!result) {
                this.setState({userId: '', password: ''});
            }
        });
    }

    handleKeyPress(e) {
        if(e.charCode == 13){
            if(this.props.mode){
                //로그인쪽이면
                this.handleLogin();
            }else{
                this.handleSignUp();
            }
        }
    }

    render() {
        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>아이디</label>
                    <input name="userId"
                        type="text"
                        className="validate"
                        value={this.state.userId}
                        onChange={this.handleChange}/>
                </div>
                <div className="input-field col s12">
                    <label>비밀번호</label>
                    <input name="password"
                        type="password"
                        className="validate"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn" onClick={this.handleLogin}>로그인</a>
                    </div>
                </div>
                <div className="footer">
                    <div className="card-content">
                        <Link to="/signup">회원 가입</Link>
                    </div>
                </div>
            </div>
        );

        const signUpView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn" onClick={this.handleSignUp}>회원가입</a>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">My Cart</Link>
                <div className="card">
                    <div className="header center">
                        <div className="header black-text center">
                            <div className="card-content">{this.props.mode
                                    ? "LOGIN"
                                    : "SIGNUP"}</div>
                        </div>
                        {this.props.mode
                            ? loginView
                            : signUpView}
                    </div>
                </div>
            </div>
        );
    }
}

Authentication.propTypes = propTypes;
Authentication.defaultProps = defaultProps;

export default Authentication;
