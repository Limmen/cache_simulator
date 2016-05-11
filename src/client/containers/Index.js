/**
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import CacheFormComponent from './../components/CacheForm';
import FetchFormComponent from './../components/FetchForm';
import { CACHE_FORM_SUBMIT, FETCH_FORM_SUBMIT } from '../constants/ActionTypes'

class Index extends React.Component {

  render() {
    const myInitialValues = {
      initialValues: {
        operationType: "LOAD"
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

function mapStateToProps(state) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cacheHandleSubmit: (data) => {
      dispatch({ type: CACHE_FORM_SUBMIT , fields: data})
    },
    fetchHandleSubmit: (data) => {
      dispatch({ type: FETCH_FORM_SUBMIT , fields: data})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
