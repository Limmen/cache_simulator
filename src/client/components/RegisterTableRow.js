/**
 * RegisterTableRow component. Constitutes as a row in a table.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import ReactTooltip from 'react-tooltip'

class RegisterTableRow extends React.Component {


  render() {
    return (
      <tr id={this.props.data.get('id')} className="cache_row registertablerow-component">
        <td>
          {this.props.data.get("number")}
        </td>
        <td>
          {this.props.data.get("data")}
        </td>
      </tr>
    );
  }
}

RegisterTableRow.displayName = 'RegisterTableRow';
RegisterTableRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default RegisterTableRow;
