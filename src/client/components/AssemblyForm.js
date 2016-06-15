/**
 * AssemblyForm Component. A component containing a form for attempting to load from the cache.
 */
'use strict';

import React from 'react';
import { reduxForm } from 'redux-form'
import Textarea from 'react-textarea-autosize';
export const fields = ['assembly']


class AssemblyForm extends React.Component {

  render() {
    const { fields: { assembly }, handleSubmit, submitting } = this.props
    return (
      <div className="fetchform-component row">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-sm-12">
            <p className="bold row">Assembly</p>
            <textarea className="form-control" rows="5" id="comment" {...assembly}/>
          </div>
          <div className="form-group col-sm-12">
            <button type="submit" disabled={submitting} className="btn btn-default">
              {submitting ? <i/> : <i/>} Run
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AssemblyForm.displayName = 'AssemblyForm';

AssemblyForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  fields
})(AssemblyForm)
