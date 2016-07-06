/**
 * InstructionPanel redux-container. Connects the instruction panel to the redux-store.
 *
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import FetchFormComponent from './../components/FetchForm';
import * as actions from '../actions/'
import {scroller} from 'react-scroll';

class InstructionPanel extends React.Component {

  render() {
    const myInitialValues = {
      initialValues: {
        operationType: 'LOAD'
      }
    }
    return (
      <div>
        <FetchFormComponent onSubmit={this.props.visualSimulation ? this.props.visualSimulator : this.props.simulator} {...myInitialValues} simulating={this.props.simulating} />
      </div>
    );
  }
}

InstructionPanel.propTypes = {
  visualSimulator: React.PropTypes.func.isRequired
}

/**
 * If specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called.
 * Its result must be a plain object*, and it will be merged into the component’s props.
 * If you omit it, the component will not be subscribed to the Redux store.
 *
 * @returns {{}}
 */
function mapStateToProps(state) {
  return {
    simulating: state.cacheAndMemoryContent.get("simulating"),
    visualSimulation: state.cacheAndMemoryContent.get("visualSimulation")
  }
}
/**
 * Maps the redux dispatcher to props that this container provides.
 *
 * @param dispatch redux-dispatcher
 * @returns {{fetchHandleSubmit: visualSimulation}} - Object with action creators.
 */
const mapDispatchToProps = (dispatch) => {
  return {

    simulator: (fields) => {
      scroller.scrollTo('cache_mem_scroll_position', {
        duration: 0,
        offset: -50,
        smooth: true
      })
      dispatch(actions.startSimulation())
      dispatch(actions.cacheContentUpdate(fields))
      dispatch(actions.stopSimulation())
    },
    /**
     * Function to handle submission of the fetchform. Dispatches a action.
     * @param fields of the action
     */
    visualSimulator: (fields) => {
      scroller.scrollTo('cache_mem_scroll_position', {
        duration: 0,
        offset: -50,
        smooth: true
      })
      dispatch(actions.startSimulation())
      dispatch(actions.cacheContentUpdate(fields))
      setTimeout(dispatch, 3600, actions.stopSimulation())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructionPanel)
