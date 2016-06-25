/**
 * AssemblyPanel redux-container. Connects the assembly panel to the redux-store.
 *
 * Created by kim on 2016-06-16.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import AssemblyForm from './../components/AssemblyForm';
import * as actions from '../actions/'
import {scroller} from 'react-scroll';

class AssemblyPanel extends React.Component {

  render() {
    return (
      <div>
        <AssemblyForm onSubmit={this.props.fetchHandleSubmit} simulating={this.props.simulating}  />
      </div>
    );
  }
}

AssemblyPanel.propTypes = {
  fetchHandleSubmit: React.PropTypes.func.isRequired
}

/**
 * Maps application state that is used in this container to props.
 *
 * @param state
 * @returns {{simulating: *}} object with props
 */
function mapStateToProps(state) {
  return {
    simulating: state.cacheAndMemoryContent.get("simulating")
  }
}
/**
 * Maps the redux dispatcher to props that this container provides.
 *
 * @param dispatch redux-dispatcher
 * @returns {{fetchHandleSubmit: fetchHandleSubmit}} - Object with action creators.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Function to handle submission of the assemblyform. Dispatches actions for each line of assembly.
     * @param fields of the action
     */
    fetchHandleSubmit: (fields) => {
      scroller.scrollTo('cache_mem_scroll_position', {
        duration: 1500,
        offset: -150,
        smooth: true
      })
      setTimeout(function (){
        dispatch(actions.startSimulation())
        let rows = fields.assembly.split("\n");
        let row = rows[0];
        let tokens = row.replace(/ +(?= )/g,'').split(" ");
        let operation = tokens[0];
        let register = tokens[1];
        let address = tokens[2];
        fields = {
          fetchAddress: address,
          operationType : operation,
          register: register
        }
        dispatch(actions.cacheContentUpdate(fields))

        for(let i = 1; i < rows.length; i++){
          let row = rows[i];
          let tokens = row.replace(/ +(?= )/g,'').split(" ");
          let operation = tokens[0];
          let register = tokens[1];
          let address = tokens[2];
          fields = {
            fetchAddress: address,
            operationType : operation,
            register: register
          }
          setTimeout(dispatch, i*3600, actions.cacheContentUpdate(fields))
        }
        setTimeout(dispatch, rows.length*3600, actions.stopSimulation())
      }, 1500);

    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssemblyPanel)
