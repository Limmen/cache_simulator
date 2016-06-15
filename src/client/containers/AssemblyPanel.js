/**
 * AssemblyPanel redux-container. Connects the assembly panel to the redux-store.
 *
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import AssemblyForm from './../components/AssemblyForm';
import * as actions from '../actions/'

class AssemblyPanel extends React.Component {

  render() {
    return (
      <div>
        <AssemblyForm onSubmit={this.props.fetchHandleSubmit}  />
      </div>
    );
  }
}

AssemblyPanel.propTypes = {
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
  return {
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
     * Function to handle submission of the fetchform. Dispatches a action.
     * @param fields of the action
     */
    fetchHandleSubmit: (fields) => {
      dispatch(actions.cacheContentUpdate(fields))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssemblyPanel)
