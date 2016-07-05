/**
 * InstructionTableComponent.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions'


class InstructionTable extends React.Component {

  render() {
    if(this.props.data.size > 0)
    return (
      <div className="instructiontable-component">
        <Table
          rowsCount={this.props.data.size}
          rowHeight={50}
          headerHeight={50}
          width={this.props.containerWidth}
          maxHeight={500}>
          <Column
            header={<Cell>Operation type</Cell>}
            cell={props => (
           <Cell {...props}>
           {this.props.data.get(props.rowIndex).get("operationType")}
          </Cell>
        )}
            width={50}
            flexGrow={1}
          />
          <Column
            header={<Cell>Register</Cell>}
            cell={props => (
           <Cell {...props}>
         {this.props.data.get(props.rowIndex).get("register")}
          </Cell>
        )}
            width={50}
            flexGrow={1}
          />
          <Column
            header={<Cell>Address</Cell>}
            cell={props => (
           <Cell {...props}>
         {this.props.data.get(props.rowIndex).get("address")}
          </Cell>
        )}
            width={50}
            flexGrow={1}
          />
          <Column
            header={<Cell>Result</Cell>}
            cell={props => (
           <Cell {...props}>
         {this.props.data.get(props.rowIndex).get("result")}
          </Cell>
        )}
            width={50}
            flexGrow={1}
          />
        </Table>
      </div>
    );
    else
      return(<div className="instructiontable-component"> <p className="center_text">No results yet</p></div>)
  }
}

InstructionTable.displayName = 'InstructionTable';

 InstructionTable.propTypes = {
 data: React.PropTypes.object.isRequired
 };

export default Dimensions()(InstructionTable);
