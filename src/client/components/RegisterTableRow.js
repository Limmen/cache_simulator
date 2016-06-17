/**
 * RegisterTableRow component. Constitutes as a row in a table.
 *
 * Created by kim on 2016-06-16.
 */

'use strict';

import React from 'react';

class RegisterTableRow extends React.Component {


  render() {
    return (
      <tr id={this.props.data.get('id')} className="registertablerow-component">
        <td className="center_text">
          {this.props.data.get("number")}
        </td>
        <td className="center_text">
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
