/**
 * Created by kim on 2016-05-06.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux'
import CacheFormComponent from './../components/CacheForm';
import { CACHE_FORM_SUBMIT } from '../constants/ActionTypes'

class CacheForm extends React.Component {

  render() {
    return (
      <div>
        <CacheFormComponent onSubmit={this.props.handleSubmit} />
      </div>
    );
  }
}

//CacheForm.defaultProps = {};
CacheForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    fields : state.cacheform
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (data) => {
      dispatch({ type: CACHE_FORM_SUBMIT , fields: data})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheForm)

