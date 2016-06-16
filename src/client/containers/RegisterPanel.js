/**
 * RegisterPanel redux-container. Connects the instruction panel to the redux-store.
 *
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import RegisterTable from './../components/RegisterTable';

class RegisterPanel extends React.Component {

  render() {
    return (
      <div>
        <RegisterTable data={this.props.register}/>
      </div>
    );
  }
}

RegisterPanel.propTypes = {

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
    register: state.cacheAndMemoryContent.get('register')
  }
}

const mapDispatchToProps = () => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPanel)
