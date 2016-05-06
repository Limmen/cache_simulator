/**
 * Created by kim on 2016-05-06.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux'
import CacheFormComponent from './../components/CacheForm';

require('normalize.css/normalize.css');
//require('styles/CacheForm.css');

class CacheForm extends React.Component {
  render() {
    return (
      <div>
        <CacheFormComponent
          blockSize=""
          cacheSize=""
          associativity=""
          fetchAddress=""
          resetForm=""
          handleSubmit=""
          submitting=""
        />
      </div>
    );
  }
}

//CacheForm.defaultProps = {};
CacheForm.propTypes = {

}

function mapStateToProps(state) {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheForm)

