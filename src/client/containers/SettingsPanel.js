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
import {scroller} from 'react-scroll';
class SettingsPanel extends React.Component {

  render() {
    const myInitialValues = {
      initialValues: {
        replacementAlgorithm: 'LRU',
        visualSimulation: true
      }
    }
    return (
      <div>
        <CacheFormComponent onSubmit={this.props.cacheHandleSubmit} {...myInitialValues}/>
        <div className="alert alert-warning center_text">
          <strong>Note:</strong> Visual simulation is not recommended for very large cache-sizes (e.g. 4096 bytes), the point of the visualisation
          is to be able to see the cache- hits and misses in real time, which is not possible if the cache is too large. Also the rendering
          time and page responsiveness will be slower.
        </div>
      </div>
    );
  }
}

SettingsPanel.propTypes = {
  cacheHandleSubmit: React.PropTypes.func.isRequired
}

/**
 * If specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called.
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
      dispatch(actions.startRendering())
      scroller.scrollTo('cache_init_scroll_position', {
        duration: 1500,
        offset: 475,
        smooth: true
      })
      setTimeout(dispatch, 100, actions.cacheAndMemoryContentInitialization(fields))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPanel)
