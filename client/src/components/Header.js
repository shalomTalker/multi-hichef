import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-hichef.png';
import { connect } from 'react-redux';

import * as actions from '../actions';
class Header extends Component {
    constructor(props) {
        super(props);
    }

    signOut = () => {
        this.props.signOut();
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark"  style={{ marginBottom: '30px' }}>
                <Link className="navbar-brand" to="/">CodeWorkr API Auth</Link>
                <button className="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="nav navbar-nav ml-auto" style={{ float: 'right' }}>
                        {!this.props.isAuth ?
                            [<li className="nav-item" key="signup">
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                            </li>,
                            <li className="nav-item" key="signin">
                                <Link className="nav-link" to="/signin">Sign In</Link>
                            </li>] : null}

                        {this.props.isAuth ?
                            [<li className="nav-item" key="dashboard">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>,
                            <li className="nav-item" key="signout">
                                <Link className="nav-link" to="/signout" onClick={this.signOut}>Sign Out</Link>
                            </li>] : null}
                    </ul>
                </div>
            </nav>
           
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, actions)(Header);


