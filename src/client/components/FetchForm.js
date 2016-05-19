/**
 * FetchForm Component. A component containing a form for attempting to load from the cache.
 */
'use strict';

import React from 'react';
import { reduxForm } from 'redux-form'
export const fields = ['fetchAddress', 'operationType']

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
  }
  return errors
}

class FetchForm extends React.Component {
  render() {
    const { fields: { fetchAddress, operationType }, handleSubmit, submitting } = this.props
    return (
      <div className="cacheform-component row">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-sm-6">
            <label className="bold">Fetch Address</label>
            <div>
              <input type="text" placeholder="fetch address" {...fetchAddress} className="form-control"/>
            </div>
            <div className="error">
            {fetchAddress.touched && fetchAddress.error && <div>{fetchAddress.error}</div>}
              </div>
          </div>
          <div className="form-group col-sm-6">
            <label className="bold">Operation type</label>
            <div>
              <select className="form-control" {...operationType}>
                <option>LOAD</option>
                <option>STORE</option>
              </select>
            </div>
          </div>
          <div className="form-group col-sm-12">
            <button type="submit" disabled={submitting} className="btn btn-default">
              {submitting ? <i/> : <i/>} Fetch
            </button>
          </div>
        </form>
      </div>
    );
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
