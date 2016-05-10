/**
 * Created by kim on 2016-05-06.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux'
import FetchFormComponent from './../components/FetchForm';
import { FETCH_FORM_SUBMIT } from '../constants/ActionTypes'

class FetchForm extends React.Component {
  render() {
    const myInitialValues = {
      initialValues: {
        operationType: "LOAD"
      }
    }

    return (
      <div>
        <FetchFormComponent onSubmit={this.props.handleSubmit} {...myInitialValues} />
      </div>
    );
  }
}

//FetchForm.defaultProps = {};
FetchForm.propTypes = {

}

function mapStateToProps(state) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (data) => {
      dispatch({ type: FETCH_FORM_SUBMIT , fields: data})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchForm)

