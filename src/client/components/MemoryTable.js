/**
 * MemoryTableComponent. A component displaying a table, that illustrates a cachememory.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions'

class MemoryTable extends React.Component {

  render() {
    return (
      <div className="memorytable-component">
        <Table
          rowsCount={this.props.data.size}
          rowHeight={50}
          headerHeight={50}
          width={this.props.containerWidth}
          height={500}>
          <Column
            header={<Cell>Address</Cell>}
            cell={props => (
           <Cell {...props}>
         {this.props.data.get(props.rowIndex).get('address_string')}
          </Cell>
        )}
            width={50}
            flexGrow={1}
          />
          <Column
            header={<Cell>Data (randomized)</Cell>}
            cell={props => (
           <Cell {...props}>
         {this.props.data.get(props.rowIndex).get('data_string')}
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
export default Dimensions()(MemoryTable);
