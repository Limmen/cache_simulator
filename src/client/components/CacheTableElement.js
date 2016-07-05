/**
 * CacheTableElementComponent. Functional stateless component that constitutes as a element in a table.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import ReactTooltip from 'react-tooltip'


class CacheTableElement extends React.Component {

  /**
   * Class constructor. Called when instantiated.
   *
   * @param props
   * @param context
   */
  constructor(props, context) {
    super(props, context);
    this.green = false;
  }

  /**
   * Visual effect when a instruction hit on this element occurs
   * @returns {boolean}
   */
  animateHit() {
    if (this.props.data.get("hit")) {
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
  removeBackground() {
    $("#" + this.props.data.get("id")).css("background-color", "");
  }

  /**
   * Visual effect
   */
  changeColor() {
    if (this.green) {
      $("#" + this.props.data.get("id")).animate({'backgroundColor': 'white'}, 250, 'linear', function() { });
      this.green = false;
    }
    else {
      $("#" + this.props.data.get("id")).animate({'backgroundColor': 'green'}, 250, 'linear', function() { });
      this.green = true;
    }
  }

  render() {
    this.animateHit.bind(this)()
    return (
      <td data-tip data-for={this.props.data.get('id')} id={this.props.data.get('id')}
          className="cache_element cachetableelement-component center_text_2">
        {this.props.data.get('data')}
        <ReactTooltip id={this.props.data.get('id')} {...this.props}>
          <p>Byte: {this.props.data.get('byte')}</p>
          <p>Address: {this.props.data.get('address')}</p>
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
