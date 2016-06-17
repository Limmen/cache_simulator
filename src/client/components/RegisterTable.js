/**
 * RegisterTableComponent. A component displaying a table, that illustrates a register memory.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import RegisterTableRow from './RegisterTableRow'


class RegisterTable extends React.Component {

  /**
   * Creates table rows.
   *
   * @returns {Array} array of rows.
   */
  createRows() {
    let rows = [];
    for (let i = 0; i < this.props.data.get('registers').size; i++) {
      rows.push(<RegisterTableRow data={this.props.data.get('registers').get(i)} key={i}/>);
    }
    return rows;
  }

  render() {
    return (
      <div className="registertable-component">
        <table className="table table-bordered cache center-table">
          <caption>Register</caption>
          <thead>
          <tr>
            <td className="bold center_text">Register</td>
            <td className="bold center_text">Data (4-byte word)</td>
          </tr>
          </thead>
          <tbody>
          {this.createRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

RegisterTable.displayName = 'RegisterTable';

RegisterTable.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default RegisterTable;
