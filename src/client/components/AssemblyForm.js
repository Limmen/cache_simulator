/**
 * AssemblyForm Component. A component containing a form for attempting to load from the cache.
 */
'use strict';

import React from 'react';
import { reduxForm } from 'redux-form'
export const fields = ['assembly']

const validate = values => {
  const errors = {}
  if (!values.assembly) {
    errors.assembly = 'Required'
  }

  if (values.assembly !== undefined) {
    let rows = values.assembly.split("\n");
    let row;
    for (let i = 0; i < rows.length; i++) {
      row = rows[i].trim();
      if (row === "") {
        errors.assembly = "Error on line " + (i + 1) + " '" + row + "'" + ".\n" + "Assembly line input need to be on the form: OPERATION \<space\> REGISTER \<space\> ADDRESS";
      }
      let tokens = row.replace(/ +(?= )/g, '').split(" ");
      if (tokens.length !== 3) {
        errors.assembly = "Error on line " + (i + 1) + " '" + row + "'" + ".\n" + "Assembly line input need to be on the form: OPERATION \<space\> REGISTER \<space\> ADDRESS";
        return errors;
      }
      let operation = tokens[0];
      let register = tokens[1];
      let address = tokens[2];
      if (operation.toUpperCase() !== "LOAD" && operation.toUpperCase() !== "STORE") {
        errors.assembly = "Error on line " + (i + 1) + " '" + row + "'" + ".\n" + "Invalid operation, needs to be LOAD or STORE";
        return errors;
      }
      if (isNaN(register)) {
        errors.assembly = "Error on line " + (i + 1) + " '" + row + "'" + ".\n" + "Invalid register, needs to be a number between 0-31";
        return errors;
      }
      if (register < 0 || register > 31) {
        errors.assembly = "Error on line " + (i + 1) + " '" + row + "'" + ".\n" + "Invalid register, needs to be a number between 0-31";
        return errors;
      }
      if (!new RegExp("[0-9A-Fa-f]+").test(address)) {
        errors.assembly = "Error on line " + (i + 1) + " '" + row + "'" + ".\n" + "Invalid address, needs to be a hexadecimal number";
        return errors;
      }
      if (isNaN(parseInt(address, 16))) {
        errors.assembly = "Error on line " + (i + 1) + " '" + row + "'" + ".\n" + "Invalid address, needs to be a hexadecimal number";
        return errors;
      }
      if (parseInt(address, 16) % 4 !== 0) {
        errors.assembly = "Error on line " + (i + 1) + " '" + row + "'" + ".\n" + 'Invalid address, needs to be a multipel of 4. Remember that you need to enter the address in hexadecimal'
        return errors;
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
                <h3 className="modal-title bold">Assembly Input Guidelines</h3>
              </div>
              <div className="modal-body row">
                <p>
                  One statement on each row.
                </p>
                <p>
                  A statement has the following form: <code>&lt;Operation&gt;&lt;space&gt;&lt;Register&gt;&lt;space&gt;&lt;Address&gt;</code>
                </p>
                <p>
                  Allowed operations are: <code>LOAD</code> and <code>STORE</code>
                </p>
                <p className="bold">Example:</p>
                <div>
                  <code>LOAD 1 10 </code> <br/>
                  <code>LOAD 2 10 </code> <br/>
                  <code>STORE 2 1C </code> <br/>
                  <code>LOAD 1 C</code> <br/>
                  <code>LOAD 23 0 </code> <br/>
                  <code>LOAD 17 0 </code> <br/>
                  <code>LOAD 9 1 </code> <br/>
                  <code>STORE 2 28 </code> <br/>
                  <code>LOAD 2 34 </code> <br/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}>
          <div className="form-group col-sm-12 assembly_input">
            <p className="bold row">
              Assembly input
            </p>
      <textarea
        className="form-control"
        rows="5"
        id="comment"
        {...
          assembly
        }
      />
            <div className="error_without_margin">
              {assembly.touched && assembly.error && <div>{assembly.error}</div>
              }
            </div>
          </div>
          <div className="form-group col-sm-6 assembly_buttongroup">
            <button type="submit" disabled={(this.props.simulating|| submitting)} className="btn btn-default">
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
