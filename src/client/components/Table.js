/**
 * TableComponent. A component displaying a table, that illustrates a cachememory.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import TableRow from './TableRow'


class Table extends React.Component {
  render() {
    var rows = [];
    for (var i = 0; i < this.props.rows; i++) {
      rows.push(<TableRow blocksize={this.props.blocksize} key={i}/>);
    }
    return (
      <div className="table-component">
        <table className="table table-bordered cache">
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.displayName = 'Table';
export default Table;
