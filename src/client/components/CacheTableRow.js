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
  /**
   * Class constructor. Called when instantiated.
   *
   * @param props
   * @param context
   */
  constructor(props, context) {
    super(props, context);
    this.red = false;
  }

  /**
   * Function to create elements in the row based on the given props.
   *
   * @returns {Array}
   */
  createElements() {
    let elements = [];
    for (let i = 0; i < this.props.data.get('elements').size; i++) {
      elements.push(<CacheTableElement key={i} data={this.props.data.get('elements').get(i)}/>);
    }
    return elements;
  }

  /**
   * Visual effect for instruction miss
   *
   * @returns {boolean}
   */
  animateMiss() {
    if (this.props.data.get("miss")) {
      for (let i = 0; i < 6; i++) {
        setTimeout(this.changeColor.bind(this), i * 500)
      }
      setTimeout(this.removeBackground.bind(this), 7 * 500)
    }
    return true;
  }

  /**
   * Visual effect
   */
  removeBackground(){
    $("#" + this.props.data.get("id")).css("background-color", "");
  }

  /**
   * Visual effect
   */
  changeColor() {
    if (this.red) {
      $("#" + this.props.data.get("id")).animate({'backgroundColor': 'white'}, 250, 'linear', function() { });
      this.red = false;
    }
    else {
      $("#" + this.props.data.get("id")).animate({'backgroundColor': 'red'}, 250, 'linear', function() { });
      this.red = true;
    }
  }

  render() {
    this.animateMiss.bind(this)()
    return (
      <tr id={this.props.data.get('id')} className="cache_row cachetablerow-component">
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
