/**
 * CacheTableRow component. Constitutes as a row in a table.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import CacheTableElement from './CacheTableElement'
import ReactTooltip from 'react-tooltip'

class CacheTableRow extends React.Component {

  createElements(){
    let elements = [];
    for (let i = 0; i < this.props.data.get('elements').size; i++) {
      elements.push(<CacheTableElement key={i} data={this.props.data.get('elements').get(i)}/>);
    }
    return elements;
  }

  render() {
    return (
      <tr className="cache_row cachetablerow-component">
        <td data-tip data-for={this.props.data.get('id')}>
          {this.props.data.get('validbit')}
          <ReactTooltip id={this.props.data.get('id')} {...this.props}>
            <p>{this.props.data.get('validbit') === 1 ? "Valid" : "Not Valid"}</p>
          </ReactTooltip>
        </td>
        <td data-tip data-for={this.props.data.get('id') + "index"}>
          {this.props.data.get("tag")}
          <ReactTooltip id={this.props.data.get('id') + "index"} {...this.props}>
            <p>Index: {this.props.data.get('index')}</p>
          </ReactTooltip>
        </td>
        {this.createElements()}
      </tr>
    );
  }
}

CacheTableRow.displayName = 'CacheTableRow';
CacheTableRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default CacheTableRow;
