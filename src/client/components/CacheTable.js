/**
 * CacheTableComponent. A component displaying a table, that illustrates a cachememory.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import CacheTableRow from './CacheTableRow'


class CacheTable extends React.Component {

  /**
   * Creates table rows.
   *
   * @returns {Array} array of rows.
   */
  createRows() {
    let rows = [];
    for (let i = 0; i < this.props.data.rows.length; i++) {
      rows.push(<CacheTableRow data={this.props.data.rows[i]} key={i}/>);
    }
    return rows;
  }

  render() {
    return (
      <div className="cachetable-component">
        <table className="table table-bordered cache center-table">
          <caption>Set: {this.props.data.set}</caption>
          <thead>
          <tr>
            <td className="bold center_text">Valid Bit</td>
            <td className="bold center_text">Tag</td>
            <td className="bold center_text" colSpan={this.props.data.nr_elements}>Data</td>
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

CacheTable.displayName = 'CacheTable';

CacheTable.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default CacheTable;
