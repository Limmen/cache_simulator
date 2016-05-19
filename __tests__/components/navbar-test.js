/**
 * Test for the navbar-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/NavBar');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NavBar from '../../src/client/components/NavBar';

describe('NavBar', () => {
  let component;
  let renderedNavBar;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <div><NavBar /></div>
    );
    renderedNavBar= ReactDOM.findDOMNode(component);
  });

  it('should have its component name as default className', () => {
    let navbar = renderedNavBar.querySelector('.navbar-component')
    expect(navbar.className).toEqual('navbar-component');
  });

  it('should render a nav', () => {
    let nav = renderedNavBar.querySelector('.nav')
    expect(nav).not.toEqual(null);
  });
});
