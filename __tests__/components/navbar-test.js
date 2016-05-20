/**
 * Test for the navbar-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/NavBar');

import React from 'react';
import { render } from 'enzyme';
import NavBar from '../../src/client/components/NavBar';

describe('NavBar', () => {
  let component;

  beforeEach(() => {
    component = render(<NavBar />);
  });

  it('should have its component name as default className', () => {
    expect(component.find("div").hasClass("navbar-component")).toEqual(true)
  });

  it('should render one nav', () => {
    expect(component.find(".nav").length).toEqual(1);
  });
});
