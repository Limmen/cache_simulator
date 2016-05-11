/**
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/Footer');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footer from '../../src/client/components/Footer';

describe('Footer', () => {
  let component;
  let renderedFooter;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <div><Footer /></div>
    );
    renderedFooter= ReactDOM.findDOMNode(component);
  });

  it('should render correct footer text', () => {
    let footerText = renderedFooter.querySelector('.text-muted')
    expect(footerText.textContent).toEqual('Copyright 2016@Kim Hammar');
  });

  it('should render a footer', () => {
    let footer = renderedFooter.querySelector('footer')
    expect(footer).not.toEqual(null);
  });

  it('should have its component name as default className', () => {
    let footer = renderedFooter.querySelector('.footer-component')
    expect(footer.className).toEqual('footer-component');
  });
});
