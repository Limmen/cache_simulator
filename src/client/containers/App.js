/**
 * Main app redux-container that bootstraps header, footer and main content depending on the active route.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux'
import Header from './../components/Header';
import Footer from './../components/Footer';
import NavBar from './../components/NavBar';

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
            <NavBar/>
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

App.propTypes = {}

function mapStateToProps() {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

