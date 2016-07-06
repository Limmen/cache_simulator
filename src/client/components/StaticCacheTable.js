/**
 * StaticCacheTableComponent. A component displaying a table, that illustrates a cachestaticcache.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions'

class StaticCacheTable extends React.Component {

  render() {
    return (
      <div className="staticcachetable-component">
        <h5 className="bold  center_text2 set_title">Set {this.props.data.get("set")}</h5>
        <Table
          rowsCount={this.props.data.get("rows").size}
          rowHeight={75}
          headerHeight={50}
          width={this.props.containerWidth}
          maxWidth={this.props.containerWidth}
          maxHeight={500}>
          <Column
            header={<Cell>Index</Cell>}
            cell={props => (
           <Cell {...props}>
         {this.props.data.get("rows").get(props.rowIndex).get('index')}
          </Cell>
        )}
            width={100}
            flexGrow={1}
          />
          <Column
            header={<Cell>Validbit</Cell>}
            cell={props => (
           <Cell {...props} className="validbit">
         {this.props.data.get("rows").get(props.rowIndex).get('validbit')}
          </Cell>
        )}
            width={100}
            flexGrow={1}
          />
          <Column
            header={<Cell>Tag</Cell>}
            cell={props => (
           <Cell {...props} className="tag">
         {this.props.data.get("rows").get(props.rowIndex).get('tag')}
          </Cell>
        )}
            width={100}
            flexGrow={1}
          />
          {this.props.data.get("rows").get(0).get("elements").map((element) => {
            return(
            <Column
              key={element.get("byte")}
              header={<Cell>Byte {element.get("byte")}</Cell>}
              cell={props => (
           <Cell {...props}>
         <p><b>Address:</b> {this.props.data.get("rows").get(props.rowIndex).get('elements').get(element.get("byte")).get("address")} </p>
         <p><b> Data: </b>{this.props.data.get("rows").get(props.rowIndex).get('elements').get(element.get("byte")).get("data")} </p>
          </Cell>
        )}
              width={135}
              flexGrow={1}
            />)
          })}
          </Table>
      </div>
    );
  }
}

StaticCacheTable.displayName = 'StaticCacheTable';
StaticCacheTable.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default Dimensions()(StaticCacheTable);
