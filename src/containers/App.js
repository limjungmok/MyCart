import React from 'react';
import update from 'react-addons-update';

import { Nav, InputUrl, ItemList , Authentication } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        // 이름가지고 쿠키 얻어내기
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // 쿠키에서 로그인데이터 추출
        let loginData = getCookie('key');

        // 로그인 상태가 아니라면, 아무것도안한다.
        if(typeof loginData === "undefined") return;

        // base64 인코딩
        loginData = JSON.parse(atob(loginData));

        // 로그인 상태가 아니라면, 아무것도안한다.
        if(!loginData.isLoggedIn) return;

        // 새로고침과 동시에 쿠키에 세션을 보유하고있다면
        // 쿠키가 유효한지 확인
        this.props.getStatusRequest().then(
            () => {
                console.log(this.props.status);
                // 세션이 유효하지 않다면
                if(!this.props.status.valid) {
                    // 세션을 끊는다(로그아웃시킴)
                    loginData = {
                        isLoggedIn: false,
                        userId: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));

                    // 알려줌
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);

                }
            }
        );
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('로그아웃 완료', 2000);

                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    userId: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }

    render(){
        /* 정규식 이용해서 현재 페이지가 로그인 페이지인지 회원가입 페이지인지 구분 */
        let path = /(login|signup)/;
        let isAuth = path.test(this.props.location.pathname);

        return (
            <div>
                {isAuth ? undefined : <Nav isLoggedIn = {this.props.status.isLoggedIn}
                                            onLogout = {this.handleLogout}/>}
                {this.props.children}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
