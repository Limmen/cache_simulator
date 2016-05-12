/**
 * TableComponent. A component displaying a table, that illustrates a cachememory.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import TableRow from './TableRow'


class Table extends React.Component {

  /**
   * Creates table rows.
   *
   * @returns {Array} array of rows.
   */
  createRows() {
    let rows = [];
    for (let i = 0; i < this.props.rows; i++) {
      rows.push(<TableRow blocksize={this.props.blocksize} key={i}/>);
    }
    return rows;
  }

  render() {
    return (
      <div className="table-component col-sm-4">
        <table className="table table-bordered cache">
          <tbody>
          {this.createRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.displayName = 'Table';
export default Table;
