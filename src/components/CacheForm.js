'use strict';

import React from 'react';
import { reduxForm } from 'redux-form'
export const fields = ['cacheSize', 'blockSize', 'associativity']

require('styles//CacheForm.css');

const validate = values => {
  const errors = {}
  if (!values.cacheSize) {
    errors.cacheSize = 'Required'
  } else if (isNaN(Number(values.cacheSize))) {
    errors.cacheSize = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.cacheSize))) {
    errors.cacheSize = 'Must be a positive integer'
  } else if (Number(values.cacheSize) < 0) {
    errors.cacheSize = "Must be a positive integer"
  }

  if (!values.blockSize) {
    errors.blockSize = 'Required'
  } else if (isNaN(Number(values.blockSize))) {
    errors.blockSize = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.blockSize))) {
    errors.blockSize = 'Must be a positive integer'
  } else if (Number(values.blockSize) < 0) {
    errors.blockSize = "Must be a positive integer"
  }

  if (!values.associativity) {
    errors.associativity = 'Required'
  } else if (isNaN(Number(values.associativity))) {
    errors.associativity = 'Must be a positive integer'
  } else if (!Number.isInteger(Number(values.associativity))) {
    errors.associativity = 'Must be a positive integer'
  } else if (Number(values.associativity) < 0) {
    errors.associativity = "Must be a positive integer"
  }

  return errors
}


class CacheForm extends React.Component {
  render() {
    const { fields: { cacheSize, blockSize, associativity }, resetForm, handleSubmit, submitting } = this.props
    return (
      <div className="cacheform-component row">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-sm-4">
            <label>Cache size</label>
            <div>
              <input type="text" placeholder="cache size" {...cacheSize} className="form-control"/>
            </div>
            {cacheSize.touched && cacheSize.error && <div>{cacheSize.error}</div>}
          </div>
          <div className="form-group col-sm-4">
            <label>Block size</label>
            <div>
              <input type="text" placeholder="block size" {...blockSize} className="form-control"/>
            </div>
            {blockSize.touched && blockSize.error && <div>{blockSize.error}</div>}
          </div>
          <div className="form-group col-sm-4">
            <label>Associativity</label>
            <div>
              <input type="text" placeholder="associativity" {...associativity} className="form-control"/>
            </div>
            {associativity.touched && associativity.error && <div>{associativity.error}</div>}
          </div>
          <div className="form-group col-sm-12">
            <button type="submit" disabled={submitting} className="btn btn-default">
              {submitting ? <i/> : <i/>} Submit
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
// CacheForm.defaultProps = {};

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
})(CacheForm)
