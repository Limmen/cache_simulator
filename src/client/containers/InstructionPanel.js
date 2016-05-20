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

class InstructionPanel extends React.Component {

  render() {
    const myInitialValues = {
      initialValues: {
        operationType: 'LOAD'
      }
    }
    return (
      <div>
        <FetchFormComponent onSubmit={this.props.fetchHandleSubmit} {...myInitialValues} />
        <div className="instruction_stats">
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Hit rate</td>
              <td> </td>
            </tr>
            <tr>
              <td>Miss rate</td>
              <td> </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

InstructionPanel.propTypes = {
  fetchHandleSubmit: React.PropTypes.func.isRequired
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
 * @returns {{fetchHandleSubmit: fetchHandleSubmit}} - Object with action creators.
 */
const mapDispatchToProps = (dispatch) => {
  return {
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
)(InstructionPanel)
