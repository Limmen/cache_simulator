'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Header from './../components/Header';
import Footer from './../components/Footer';

class App extends React.Component {
  render() {
    return (
      <div className="index container-fluid">
        <div className="row">
          <Header/>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            {this.props.children}
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
}

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

