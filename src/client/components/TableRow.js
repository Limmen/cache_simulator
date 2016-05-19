/**
 * TableRow component. Constitutes as a row in a table.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import TableElement from './TableElement'

class TableRow extends React.Component {

  createElements(){
    let elements = [];
    for (let i = 0; i < this.props.blocksize; i++) {
      elements.push(<TableElement key={i}/>);
    }
    return elements;
  }

  render() {
    return (
      <tr className="cache_row tablerow-component">
        {this.createElements()}
      </tr>
    );
  }
}

TableRow.displayName = 'TableRow';
TableRow.propTypes = {
  blocksize: React.PropTypes.number.isRequired
};
export default TableRow;
