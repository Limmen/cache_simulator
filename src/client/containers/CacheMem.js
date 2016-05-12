/**
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/'
import Table from '../components/Table'

class Index extends React.Component {

  render() {
    return (
      <div>
        <Table rows="4" blocksize="4"/>
      </div>
    );
  }
}

Index.propTypes = {
}

function mapStateToProps() {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
