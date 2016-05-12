/**
 * Forms redux-container. Connects the forms to the redux-store.
 *
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import CacheFormComponent from './../components/CacheForm';
import FetchFormComponent from './../components/FetchForm';
import * as actions from '../actions/'

class Forms extends React.Component {

  render() {
    const myInitialValues = {
      initialValues: {
        operationType: 'LOAD'
      }
    }
    return (
      <div>
        <CacheFormComponent onSubmit={this.props.cacheHandleSubmit}/>
        <FetchFormComponent onSubmit={this.props.fetchHandleSubmit} {...myInitialValues} />
      </div>
    );
  }
}

Forms.propTypes = {
  cacheHandleSubmit: React.PropTypes.func.isRequired,
  fetchHandleSubmit: React.PropTypes.func.isRequired
}

/**
 * f specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called.
 * Its result must be a plain object*, and it will be merged into the component’s props.
 * If you omit it, the component will not be subscribed to the Redux store.
 *
 * @returns {{}}
 */
function mapStateToProps() {
  return {}
}
/**
 * Maps the redux dispatcher to props that this container provides.
 *
 * @param dispatch redux-dispatcher
 * @returns {{cacheHandleSubmit: cacheHandleSubmit, fetchHandleSubmit: fetchHandleSubmit}} - Object with action creators.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Function to handle submission of the cacheform. Dispatches a action
     * @param fields fields of the action
     */
    cacheHandleSubmit: (fields) => {
      dispatch(actions.cacheFormSubmit(fields))
    },
    /**
     * Function to handle submission of the fetchform. Dispatches a action.
     * @param fields of the action
     */
    fetchHandleSubmit: (fields) => {
      dispatch(actions.fetchFormSubmit(fields))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms)
