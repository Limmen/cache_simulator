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
      <td data-tip data-for={this.props.data.get('id')} id={this.props.data.get('id')}
          className="cache_element cachetableelement-component">
        {this.props.data.get('data')}
        <ReactTooltip id={this.props.data.get('id')} {...this.props}>
          <p>Byte: {this.props.data.get('byte')}</p>
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
