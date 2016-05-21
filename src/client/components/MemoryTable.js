/**
 * MemoryTableComponent. A component displaying a table, that illustrates a cachememory.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

class MemoryTable extends React.Component {

  render() {
    return (
      <div className="memorytable-component center-block centering-block" col-sm-8>
        <Table
          className="center-block centering-block"
          rowsCount={this.props.data.length}
          rowHeight={50}
          headerHeight={50}
          width={500}
          height={500}>
          <Column
            header={<Cell>Address</Cell>}
            cell={props => (
           <Cell {...props}>
         {this.props.data[props.rowIndex].address}
          </Cell>
        )}
            width={50}
            flexGrow={1}
          />
          <Column
            header={<Cell>Data</Cell>}
            cell={props => (
           <Cell {...props}>
         {this.props.data[props.rowIndex].data}
          </Cell>
        )}
            width={50}
            flexGrow={1}
          />
          </Table>
      </div>
    );
  }
}

MemoryTable.displayName = 'MemoryTable';
/*
MemoryTable.propTypes = {
  data: React.PropTypes.object.isRequired
};
*/
export default MemoryTable;
