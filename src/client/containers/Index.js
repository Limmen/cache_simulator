/**
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import CacheFormComponent from './../components/CacheForm';
import FetchFormComponent from './../components/FetchForm';
import * as actions from '../actions/'

class Index extends React.Component {

  render() {
    const myInitialValues = {
      initialValues: {
        operationType: 'LOAD'
      }
    }
    return (
      <div>
        <CacheFormComponent onSubmit={this.props.cacheHandleSubmit} />
        <FetchFormComponent onSubmit={this.props.fetchHandleSubmit} {...myInitialValues} />
      </div>
    );
  }
}

Index.propTypes = {
  cacheHandleSubmit: React.PropTypes.func.isRequired,
  fetchHandleSubmit: React.PropTypes.func.isRequired
}

function mapStateToProps() {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cacheHandleSubmit: (fields) => {
      dispatch(actions.cacheFormSubmit(fields))
    },
    fetchHandleSubmit: (fields) => {
      dispatch(actions.fetchFormSubmit(fields))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
