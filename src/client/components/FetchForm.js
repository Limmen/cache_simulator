/**
 * FetchForm Component. A component containing a form for attempting to load from the cache.
 */
'use strict';

import React from 'react';
import {reduxForm} from 'redux-form'
export const fields = ['fetchAddress', 'operationType', 'register']

/**
 * Function to validate form input parameters.
 *
 * @param values to validate
 * @returns {{}} - object that contains errors if the exists.
 */
const validate = values => {
  const errors = {}

  if (!values.fetchAddress) {
    errors.fetchAddress = 'Required'
  } else if (!new RegExp("[0-9A-Fa-f]+").test(values.fetchAddress)) {
    errors.fetchAddress = 'Address needs to be a valid hexadecimal number'
    return errors;
  } else if (isNaN(parseInt(values.fetchAddress, 16))) {
    errors.fetchAddress = "address needs to be a hexadecimal number";
    return errors;
  } else if (parseInt(values.fetchAddress, 16) % 4 !== 0) {
    errors.fetchAddress = 'Address needs to be a multipel of 4, remember that you need to enter the address in hexadecimal'
    return errors;
  }

  if (!values.operationType) {
    errors.operationType = 'Required'
  }
  if (!values.register) {
    errors.register = 'Required'
  } else if (isNaN(values.register)) {
    errors.register = "register needs to be a number between 0 - 31";
    return errors;
  } else if (values.register < 0 || values.register > 31) {
    errors.register = "register needs to be a number between 0 - 31";
    return errors;
  }
  return errors
}

class FetchForm extends React.Component {

  render() {
    const {fields: {fetchAddress, operationType, register}, resetForm, handleSubmit, submitting} = this.props
    return (
      <div className="fetchform-component row">
        <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="bold col-md-4 control-label" htmlFor="input_operation_type">Operation type</label>
                <div className="col-md-8">
                  <select id="input_operation_type" className="form-control" {...operationType}>
                    <option></option>
                    <option>LOAD</option>
                    <option>STORE</option>
                  </select>
                  <div className="error">
                    {operationType.touched && operationType.error && <div>{operationType.error}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="bold col-md-4 control-label" htmlFor="input_register">Register (0-31)</label>
                <div className="col-md-8">
                  <input type="text" placeholder="memory register" id="input_register" {...register} className="form-control"/>
                </div>
                <div className="error">
                  {register.touched && register.error && <div>{register.error}</div>}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="bold col-md-4 control-label" htmlFor="input_hexaddress">Address (hexadecimal)</label>
                <div className="col-md-8">
                  <input type="text" placeholder="memory address" {...fetchAddress} id="input_hexaddress" className="form-control"/>
                </div>
                <div className="error">
                  {fetchAddress.touched && fetchAddress.error && <div>{fetchAddress.error}</div>}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <div className="col-md-12">
                  <button type="submit" disabled={(this.props.simulating|| submitting)} className="btn btn-default">
                    {submitting ? <i/> : <i/>} Run
                  </button>
                  <button type="button" onClick={resetForm} className="btn btn-default">
                    Clear Values
                  </button>
                </div>
              </div>
            </div>
          </div>
  </form>
  </
    div >
  )
    ;
  }
}

FetchForm.displayName = 'FetchForm';

FetchForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
})(FetchForm)
