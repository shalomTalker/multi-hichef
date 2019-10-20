import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from './Header'
import Footer from './Footer'

import * as actions from '../actions';



class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }
  render() {
    return (
      <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header></Header>
        <div style={{ overflowY: 'auto' }} className="row justify-content-center">{this.props.children}</div>
        <Footer></Footer>
      </div>

    );
  }
}

export default connect(null, actions)(App);

/* import React, { Component } from 'react';

import Header from './Header';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container">
        { this.props.children }
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(App); */