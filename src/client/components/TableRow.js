/**
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import TableElement from './TableElement'

class TableRow extends React.Component {

  render() {
    var elements = [];
    for (var i = 0; i < this.props.blocksize; i++) {
      elements.push(<TableElement key={i}/>);
    }
    return (
      <tr className="cache_row tablerow-component">
        {elements}
      </tr>
    );
  }
}

TableRow.displayName = 'TableRow';

// Uncomment properties you need
// TableRow.propTypes = {};
// TableRow.defaultProps = {};

export default TableRow;
