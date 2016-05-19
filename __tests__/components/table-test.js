/**
 * Test for the table-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Table from '../../src/client/components/Table';

describe('Table', () => {
  let component;
  let renderedTable;
  let rows = 4;
  let blocksize = 4;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <div><Table rows={rows} blocksize={blocksize}/></div>
    );
    renderedTable= ReactDOM.findDOMNode(component);
  });

  it('should have its component name as default className', () => {
    let table = renderedTable.querySelector('.table-component')
    expect(table.className).toEqual('table-component col-sm-4');
  });

  it('should render a table', () => {
    let table = renderedTable.querySelector('table')
    expect(table).not.toEqual(null);
  });

  it('should render tablerows', () => {
    let rows = renderedTable.querySelectorAll('.cache_row')
    expect(rows.length).toEqual(4);
  });

});
