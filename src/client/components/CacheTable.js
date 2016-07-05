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
    for (let i = 0; i < this.props.data.get('rows').size; i++) {
      rows.push(<CacheTableRow data={this.props.data.get('rows').get(i)} key={i}/>);
    }
    return rows;
  }

  render() {
    return (
      <div className="cachetable-component">
          <table className="table table-bordered cache center-table" id={"cache_table_set_" + this.props.data.get("set")}>
            <caption>Set: {this.props.data.get('set')}</caption>
            <thead>
            <tr>
              <td className="bold center_text cache_element">Valid Bit</td>
              <td className="bold center_text cache_element">Tag</td>
              <td className="bold center_text cache_element" colSpan={this.props.data.get('nr_elements')}>Data</td>
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
