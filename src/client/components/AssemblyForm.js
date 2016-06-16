/**
 * AssemblyForm Component. A component containing a form for attempting to load from the cache.
 */
'use strict';

import React from 'react';
import { reduxForm } from 'redux-form'
import Textarea from 'react-textarea-autosize';
export const fields = ['assembly']

const validate = values => {
  const errors = {}
  if (!values.assembly) {
    errors.assembly = 'Required'
  }

  if (values.assembly !== undefined) {
    let rows = values.assembly.split("\n");
    let empty = true;
    console.log(JSON.stringify(rows));
    let row;
    for (let i = 0; i < rows.length; i++) {
      row = rows[i];
      if (row !== "") {
        empty = false;
        let tokens = row.split(" ");
        if(tokens.length !== 2 ){
          errors.assembly = "Error on line " + (i+1) + " '" + row + "'" + ".\n" + "Assembly line input need to be on the form: OPERATION \<space\> ADDRESS";
          return errors;
        }
        let operation = tokens[0];
        let address = tokens[1];
        if(operation.toUpperCase() !== "LOAD" && operation.toUpperCase() !== "STORE"){
          errors.assembly = "Error on line " + (i+1) + " '" + row + "'" + ".\n" + "Invalid operation, needs to be LOAD or STORE";
          return errors;
        }
        if(isNaN(address)){
          errors.assembly = "Error on line " + (i+1) + " '" + row + "'" + ".\n" + "Invalid address, needs to be a number";
          return errors;
        }
      }

    }
  }

  return errors
}
class AssemblyForm extends React.Component {

  render() {
    const { fields: { assembly }, resetForm, handleSubmit, submitting } = this.props
    return (
      <div className="fetchform-component row">
        <div id="infoModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Assembly Input Guidelines</h4>
              </div>
              <div className="modal-body row">
                <p> yo </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group col-sm-12">
            <p className="bold row">Assembly</p>
            <textarea className="form-control" rows="5" id="comment" {...assembly}/>
            <div className="error">
              {assembly.touched && assembly.error && <div>{assembly.error}</div>}
            </div>
          </div>
          <div className="form-group col-sm-6">
            <button type="submit" disabled={submitting} className="btn btn-default">
              {submitting ? <i/> : <i/>} Run
            </button>
            <button className="btn btn-default" type="button" disabled={submitting} onClick={resetForm}>
              Clear
            </button>
            <button type="button" className="btn btn-default" data-toggle="modal" data-target="#infoModal">
              <span className="glyphicon glyphicon-info-sign"></span>
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
  fields,
  validate
})(AssemblyForm)
