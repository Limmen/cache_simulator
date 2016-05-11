/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the React test utilities
// import TestUtils from 'React-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';
import Header from 'components//Header.js';

describe('Header', () => {
  let component;

  beforeEach(() => {
    component = createComponent(Header);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('header-component');
  });
});
