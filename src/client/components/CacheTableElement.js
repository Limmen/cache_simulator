/**
 * CacheTableElementComponent. Functional stateless component that constitutes as a element in a table.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import ReactTooltip from 'react-tooltip'


class CacheTableElement extends React.Component {

  render() {
    return (
      <td data-tip data-for={this.props.data.id} id={this.props.data.id} className="cache_element cachetableelement-component">
        {this.props.data.data}
        <ReactTooltip id={this.props.data.id} {...this.props}>
          <table className="table table-striped my_tooltip">
            <tbody>
            <tr>
              <td>Index</td>
              <td>{this.props.data.index}</td>
            </tr>
            <tr>
              <td>Byte</td>
              <td>{this.props.data.byte}</td>
            </tr>
            </tbody>
          </table>
        </ReactTooltip>
        </td>
    )
  }
}


CacheTableElement.displayName = 'CacheTableElement';
CacheTableElement.propTypes = {
  data: React.PropTypes.object.isRequired
};
export default CacheTableElement;
