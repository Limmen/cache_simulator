/**
 * CacheForm component. A component that contains a form for filling in information about the cache.
 */
'use strict';

import React from 'react';
import { reduxForm } from 'redux-form'
export const fields = ['blockCount', 'blockSize', 'associativity']

/**
 * Function to validate form input parameters.
 *
 * @param values values to validate
 * @returns {{}} - object that contains errors if the exists.
 */
const validate = values => {
  const errors = {}
  if (!values.blockCount) {
    errors.blockCount = 'Required'
  } else if (isNaN(Number(values.blockCount))) {
    errors.blockCount = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.blockCount))) {
    errors.blockCount = 'Must be a positive integer'
  } else if (Number(values.blockCount) < 0) {
    errors.blockCount = 'Must be a positive integer'
  }

  if (!values.blockSize) {
    errors.blockSize = 'Required'
  } else if (isNaN(Number(values.blockSize))) {
    errors.blockSize = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.blockSize))) {
    errors.blockSize = 'Must be a positive integer'
  } else if (Number(values.blockSize) < 0) {
    errors.blockSize = 'Must be a positive integer'
  }

  if (!values.associativity) {
    errors.associativity = 'Required'
  } else if (isNaN(Number(values.associativity))) {
    errors.associativity = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.associativity))) {
    errors.associativity = 'Must be a positive integer'
  } else if (Number(values.associativity) < 0) {
    errors.associativity = 'Must be a positive integer'
  }

  return errors
}


class CacheForm extends React.Component {
  render() {
    const { fields: { blockCount, blockSize, associativity }, resetForm, handleSubmit, submitting } = this.props
    return (
      <div className="cacheform-component row">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-sm-4">
            <label className="bold">Block count</label>
            <div>
              <input type="text" placeholder="cache size" {...blockCount} className="form-control"/>
            </div>
            <div className="error">
            {blockCount.touched && blockCount.error && <div>{blockCount.error}</div>}
              </div>
          </div>
          <div className="form-group col-sm-4">
            <label className="bold">Block size (bytes)</label>
            <div>
              <input type="text" placeholder="block size" {...blockSize} className="form-control"/>
            </div>
            <div className="error">
            {blockSize.touched && blockSize.error && <div>{blockSize.error}</div>}
              </div>
          </div>
          <div className="form-group col-sm-4">
            <label className="bold">Associativity</label>
            <div>
              <input type="text" placeholder="associativity" {...associativity} className="form-control"/>
            </div>
            <div className="error">
            {associativity.touched && associativity.error && <div>{associativity.error}</div>}</div>
          </div>
          <div className="form-group col-sm-12">
            <button type="submit" disabled={submitting} className="btn btn-default">
              {submitting ? <i/> : <i/>} Create Cache Memory
            </button>
            <button type="button" disabled={submitting} onClick={resetForm} className="btn btn-default">
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

CacheForm.displayName = 'CacheForm';
CacheForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
})(CacheForm)
