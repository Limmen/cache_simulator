/**
 * SettingsPanel redux-container. Connects the settings panel to the redux-store.
 *
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import CacheFormComponent from './../components/CacheForm';
import * as actions from '../actions/'

class SettingsPanel extends React.Component {

  render() {
    const myInitialValues = {
      initialValues: {
        replacementAlgorithm: 'LRU'
      }
    }
    return (
      <div>
        <p> Large cache-sizes (e.g 1024 bytes) will take a few seconds to render </p>
        <CacheFormComponent onSubmit={this.props.cacheHandleSubmit} {...myInitialValues}/>
      </div>
    );
  }
}

SettingsPanel.propTypes = {
  cacheHandleSubmit: React.PropTypes.func.isRequired
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
 * @returns {{cacheHandleSubmit: cacheHandleSubmit}} - Object with action creators.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Function to handle submission of the cacheform. Dispatches a action
     * @param fields fields of the action
     */
    cacheHandleSubmit: (fields) => {
      dispatch(actions.cacheAndMemoryContentInitialization(fields));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPanel)
