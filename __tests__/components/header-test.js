/**
 * Test for the header-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/Header');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Header from '../../src/client/components/Header';

describe('Header', () => {
  let component;
  let renderedHeader;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <div><Header /></div>
    );
    renderedHeader= ReactDOM.findDOMNode(component);
  });

  it('should render a title', () => {
    let title = renderedHeader.querySelector('h1')
    expect(title.textContent).toEqual('Cache-Simulator');
  });

  it('should have its component name as default className', () => {
    let header = renderedHeader.querySelector('.header-component')
    expect(header.className).toEqual('header-component');
  });

  it('should render a jumbotron', () => {
    let jumbotron = renderedHeader.querySelector('.jumbotron')
    expect(jumbotron).not.toEqual(null);
  });
});
