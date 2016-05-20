/**
 * TableElementComponent. Functional stateless component that constitutes as a element in a table.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import ReactTooltip from 'react-tooltip'


class TableElement extends React.Component {

  render() {
    return (
      <td data-tip data-for={this.props.data.id} id={this.props.data.id} className="cache_element tableelement-component">
        <ReactTooltip id={this.props.data.id} {...this.props}>
          <table className="table table-striped my_tooltip">
            <tbody>
            <tr>
              <td>Address</td>
              <td>{this.props.data.address}</td>
            </tr>
            <tr>
              <td>Data</td>
              <td> {this.props.data.data}</td>
            </tr>
            <tr>
              <td>Set</td>
              <td> {this.props.data.set}</td>
            </tr>
            <tr>
              <td>Index</td>
              <td> {this.props.data.index} Bytes</td>
            </tr>
            <tr>
              <td>Byte</td>
              <td> {this.props.data.byte}</td>
            </tr>
            <tr>
              <td>ValidBit</td>
              <td> {this.props.data.validbit}</td>
            </tr>
            </tbody>
          </table>
        </ReactTooltip>
        </td>
    )
  }
}


TableElement.displayName = 'TableElement';
TableElement.propTypes = {
  data: React.PropTypes.object.isRequired
};
export default TableElement;
