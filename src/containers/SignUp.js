import React, { Component, PropTypes } from 'react';
import {Authentication} from 'components';
import { connect } from 'react-redux';
import { signUpRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(id, pw) {
        return this.props.signUpRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('회원가입 성공! 로그인 페이지로 이동합니다.', 2000);
                    browserHistory.push('/login');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    let errorMessage = [
                        '불가능한 아이디 입니다.',
                        '비밀번호가 너무 짧습니다.',
                        '이미 존재하는 아이디입니다.'
                    ];

                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return(
            <div>
                <Authentication mode = {false}
                                onSignUp = {this.handleSignUp}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.signup.status,
        errorCode: state.authentication.signup.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUpRequest: (id, pw) => {
            return dispatch(signUpRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
