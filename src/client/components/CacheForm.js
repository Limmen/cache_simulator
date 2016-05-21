/**
 * CacheForm component. A component that contains a form for filling in information about the cache.
 */
'use strict';

import React from 'react';
import { reduxForm } from 'redux-form'
export const fields = ['cacheSize', 'blockSize', 'associativity', 'replacementAlgorithm', 'memorySize']

/**
 * Function to validate form input parameters.
 *
 * @param values values to validate
 * @returns {{}} - object that contains errors if the exists.
 */
const validate = values => {
  const errors = {}
  if (!values.cacheSize) {
    errors.cacheSize = 'Required'
  } else if (isNaN(Number(values.cacheSize))) {
    errors.cacheSize = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.cacheSize))) {
    errors.cacheSize = 'Must be a positive integer'
  } else if (Number(values.cacheSize) < 0) {
    errors.cacheSize = 'Must be a positive integer'
  } else if (!(Number(values.cacheSize) % 4 === 0)) {
    errors.cacheSize = 'Must be a multiple of four'
  } else if (!(Number(values.cacheSize) % Number(values.blockSize) === 0)) {
    errors.cacheSize = 'Must be a multiple of the blocksize'
  }

  if (!values.blockSize) {
    errors.blockSize = 'Required'
  } else if (isNaN(Number(values.blockSize))) {
    errors.blockSize = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.blockSize))) {
    errors.blockSize = 'Must be a positive integer'
  } else if (Number(values.blockSize) < 0) {
    errors.blockSize = 'Must be a positive integer'
  } else if (!(Number(values.blockSize) % 4 === 0)) {
    errors.blockSize = 'Must be a multiple of four'
  }

  if (!values.associativity) {
    errors.associativity = 'Required'
  } else if (isNaN(Number(values.associativity))) {
    errors.associativity = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.associativity))) {
    errors.associativity = 'Must be a positive integer'
  } else if (Number(values.associativity) < 0) {
    errors.associativity = 'Must be a positive integer'
  } else if (!((Number(values.cacheSize)/Number(values.blockSize)) / Number(values.associativity) >= 1 || Number(values.associativity) === 1)) {
    errors.associativity = 'The specfied cache-size cannot contain that many sets'
  }

  if (!values.memorySize) {
    errors.memorySize = 'Required'
  } else if (isNaN(Number(values.memorySize))) {
    errors.memorySize = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.memorySize))) {
    errors.memorySize = 'Must be a positive integer'
  } else if (Number(values.memorySize) < 0) {
    errors.memorySize = 'Must be a positive integer'
  }

  return errors
}


class CacheForm extends React.Component {
  render() {
    const { fields: { cacheSize, blockSize, associativity, replacementAlgorithm, memorySize }, resetForm, handleSubmit, submitting } = this.props
    return (
      <div className="cacheform-component row">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-sm-4">
            <label className="bold">Cache size (bytes)</label>
            <div>
              <input type="text" placeholder="cache size" {...cacheSize} className="form-control"/>
            </div>
            <div className="error">
              {cacheSize.touched && cacheSize.error && <div>{cacheSize.error}</div>}
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
          <div className="form-group col-sm-4">
            <label className="bold">Replacement Algorithm</label>
            <div>
              <select className="form-control" {...replacementAlgorithm}>
                <option>LRU</option>
                <option>FIFO</option>
                <option>RANDOM</option>
              </select>
            </div>
          </div>
          <div className="form-group col-sm-4">
            <label className="bold">Memory size (bytes)</label>
            <div>
              <input type="text" placeholder="memory size" {...memorySize} className="form-control"/>
            </div>
            <div className="error">
              {memorySize.touched && memorySize.error && <div>{memorySize.error}</div>}
            </div>
          </div>
          <div className="form-group col-sm-12">
            <button type="submit" disabled={submitting} className="btn btn-default">
              {submitting ? <i/> : <i/>} Simulate
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
