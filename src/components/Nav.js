import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

const defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined"); }
};

class Nav extends Component {
    componentDidMount(){
        $(document).ready(function(){
            $(".button-collapse").sideNav();
        });
    };

    render() {

        const loginButton = (
           <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
           </li>
        );

        const logoutButton = (
           <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
           </li>
        );

        return(
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">MyCart</Link>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <div className="nav-wrapper">
                                <form>
                                    <div className="input-field">
                                        <input id="search" type="search" required/>
                                        <label htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </form>
                            </div>
                      </li>
                      <li><a href="#cart">Cart</a></li>
                      {this.props.isLoggedIn ? logoutButton : loginButton }
                  </ul>
                  <ul className="side-nav" id="mobile-demo">
                      <li>
                          <div className="nav-wrapper">
                              <form>
                                  <div className="input-field">
                                      <input id="search" type="search" required/>
                                      <label htmlFor="search"><i className="material-icons">search</i></label>
                                      <i className="material-icons">close</i>
                                  </div>
                              </form>
                          </div>
                      </li>
                      <li><a href="#cart">Cart</a></li>
                      {this.props.isLoggedIn ? logoutButton : loginButton }
                  </ul>
                </div>
             </nav>
        );
    }
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;
