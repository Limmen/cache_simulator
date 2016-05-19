/**
 * Test for the colophon-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/Colophon');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Colophon from '../../src/client/components/Colophon';

describe('Colophon', () => {
  let component;
  let renderedColophon;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <div><Colophon /></div>
    );
    renderedColophon= ReactDOM.findDOMNode(component);
  });

  it('should render colophon title', () => {
    let title = renderedColophon.querySelector('h3')
    expect(title.textContent).toEqual('Colophon');
  });

  it('should have its component name as default className', () => {
    let colophon = renderedColophon.querySelector('.colophon-component')
    expect(colophon.className).toEqual('colophon-component');
  });

});
