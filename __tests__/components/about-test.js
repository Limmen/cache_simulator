/**
 * Test for the about-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/About');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import About from '../../src/client/components/About';

describe('About', () => {
  let component;
  let renderedAbout;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <div><About /></div>
    );
    renderedAbout= ReactDOM.findDOMNode(component);
  });

  it('should render a about-title', () => {
    let title = renderedAbout.querySelector('h3')
    expect(title.textContent).toEqual('What is this?');
  });

  it('should have its component name as default className', () => {
    let about = renderedAbout.querySelector('.about-component')
    expect(about.className).toEqual('about-component');
  });

});
