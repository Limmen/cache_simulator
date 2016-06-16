/**
 * CacheMemory redux-container. Connects the cachememory layout with the redux store.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import Table from '../components/CacheTable'
import * as actions from '../actions/'

class CacheMem extends React.Component {

  /**
   * Visual effect after a instruction simulation
   */
  instructionResult() {
    $("#fade").fadeIn("slow");
    setTimeout(() => {
      $("#fade").fadeOut("slow");
    }, 2000);
  }

  /**
   * Creates cache tables for the view by the given state properties
   *
   * @returns {Array} tables
   */
  createTables() {
    let tables = [];
    for (let i = 0; i < this.props.cachecontent.get('cache').get('sets').size; i++) {
      tables.push(<Table className="set_margin center center-block" key={i}
                         data={this.props.cachecontent.get('cache').get('sets').get(i)}/>);
    }
    return tables;
  }

  /**
   * Returns the bitsize of a given integer
   *
   * @param num integer
   * @returns {*} bitsize
   */
  bitSize(num) {
    return num.toString(2).length;
  }

  /**
   * Returns the hitrate
   *
   * @returns {number}
   */
  getHitRate() {
    if (this.props.cachecontent.get("instructionHistory").size > 0) {
      return (Math.round((this.props.cachecontent.get("instructionHistory").filter((i) => i.get("result") === "HIT").size / this.props.cachecontent.get("instructionHistory").size) * 100) / 100) * 100
    }
    else return 0;
  }

  /**
   * Returns the missrate
   *
   * @returns {number}
   */
  getMissRate() {
    if (this.props.cachecontent.get("instructionHistory").size > 0) {
      return (Math.round((this.props.cachecontent.get("instructionHistory").filter((i) => i.get("result") === "MISS").size / this.props.cachecontent.get("instructionHistory").size) * 100) / 100) * 100
    }
    else return 0;
  }

  simulationMessage(simulating, cancelSimulation) {
    if (simulating)
      return (
        <div className="center centering-block center_text">
          <label className="bold green">ONGOING SIMULATION </label>
          <button className="btn btn-default margin-left" type="button" onClick={cancelSimulation}>
            Stop Simulation
          </button>
        </div>)
    else return (<div></div>)
  }

  render() {
    this.instructionResult()
    return (
      <div>
        <div className="row">
          <h3 className="bold center_text">Cache Information</h3>
          <div className="col-sm-4">
            <table className="table table-striped center-table">
              <caption>Cache properties</caption>
              <tbody>
              <tr>
                <td>Address length</td>
                <td>32 bits</td>
              </tr>
              <tr>
                <td>Word size</td>
                <td>32 bits</td>
              </tr>
              <tr>
                <td>Cache size</td>
                <td>{this.props.cachecontent.get('cache').get('cacheSize')} Bytes</td>
              </tr>
              <tr>
                <td>Associativity</td>
                <td>{this.props.cachecontent.get('cache').get('associativity')}</td>
              </tr>
              <tr>
                <td>Block Count</td>
                <td>{this.props.cachecontent.get('cache').get('blockCount')}</td>
              </tr>
              <tr>
                <td>Block Size</td>
                <td>{this.props.cachecontent.get('cache').get('blockSize')} Bytes</td>
              </tr>
              <tr>
                <td>Replacement Algorithm</td>
                <td>{this.props.cachecontent.get('cache').get('replacementAlgorithm')}</td>
              </tr>
              <tr>
                <td>Write Policy</td>
                <td>Write-through</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-4">
            <table className="address_layout table-bordered center-table">
              <caption>Address Layout</caption>
              <tbody>
              <tr>
                <td>
                  Tag({this.props.cachecontent.get("cache").get("tagBits")} bits)
                </td>
                <td>
                  Index({this.props.cachecontent.get("cache").get("indexBits")} bits)
                </td>
                <td>
                  Offset({this.props.cachecontent.get("cache").get("offsetBits")} bits)
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-4">
            <table className="table table-striped center-table">
              <caption>Cache performance and locality</caption>
              <tbody>
              <tr>
                <td>Hit rate</td>
                <td>{this.getHitRate()}%</td>
              </tr>
              <tr>
                <td>Miss rate</td>
                <td>{this.getMissRate()}%</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <h3 className="bold center_text">Cache Memory
            <small id="fade">{this.props.cachecontent.get("instructionResult")}</small>
          </h3>
          {this.createTables()}
        </div>
        <div className="row centering-block margin-bottom">
          {this.simulationMessage(this.props.cachecontent.get("simulating"),  this.props.cancelSimulation)}
        </div>
      </div>
    );
  }
}

CacheMem.propTypes = {}

/**
 * Maps application state that is used in this container to props.
 *
 * @param state
 * @returns {{cachecontent: *}} object with props
 */
function mapStateToProps(state) {
  return {
    cachecontent: state.cacheAndMemoryContent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelSimulation: () => {
      dispatch(actions.stopSimulation())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheMem)
