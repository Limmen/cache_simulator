/**
 * Navlink component
 *
 * Created by kim on 2016-05-19.
 */

import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active" className="navlink-component"/>
  }
})
