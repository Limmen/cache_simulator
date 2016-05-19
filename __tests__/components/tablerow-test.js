/**
 * Test for the tablerow-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TableRow from '../../src/client/components/TableRow';

describe('TableRow', () => {
  let component;
  let renderedTableRow;
  let blocksize = 4;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <table><tbody><TableRow blocksize={blocksize}/></tbody></table>
    );
    renderedTableRow= ReactDOM.findDOMNode(component);
  });

  it('should have its component name as default className', () => {
    let tablerow = renderedTableRow.querySelector('.tablerow-component')
    expect(tablerow.className).toEqual('cache_row tablerow-component');
  });


  it('should render a tablerow', () => {
    let tablerow = renderedTableRow.querySelector('tr')
    expect(tablerow).not.toEqual(null);
  });

  it('should render tablelements', () => {
    let elements = renderedTableRow.querySelectorAll('.cache_element')
    expect(elements.length).toEqual(4);
  });

});
