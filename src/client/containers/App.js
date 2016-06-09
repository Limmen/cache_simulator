/**
 * Main app redux-container that bootstraps header, footer and main content depending on the active route.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux'
import Header from './../components/Header';
import Footer from './../components/Footer';
import * as actions from '../actions/'

class App extends React.Component {

  render() {
    return (
      <div className="index container-fluid">
        <div className="row">
          <Header linkClicked={this.props.linkClicked}/>
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

App.propTypes = {}

function mapStateToProps() {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    linkClicked: (fields) => {
      dispatch(actions.linkClicked());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

