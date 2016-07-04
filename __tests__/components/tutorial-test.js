/**
 * Test for the tutorial-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/Tutorial');

import React from 'react';
import { render } from 'enzyme';
import Tutorial from '../../src/client/components/Tutorial';

describe('Tutorial', () => {
  let component;

  beforeEach(() => {
    component = render(<Tutorial />)
  });

  it('should render tutorial title', () => {
    expect(component.find("h3").text()).toEqual('Tutorial A short primer on cache memories')
  });

  it('should have its component name as default className', () => {
    expect(component.find("div").hasClass("tutorial-component")).toEqual(true)
  });

});
