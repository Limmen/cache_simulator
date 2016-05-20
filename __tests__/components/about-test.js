/**
 * Test for the about-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/About');

import React from 'react';
import { render } from 'enzyme';
import About from '../../src/client/components/About';

describe('About', () => {
  let component;
  let renderedAbout;

  beforeEach(() => {
    component = render(<About />)
  });

  it('should render a about-title', () => {
    expect(component.find("h3").text()).toEqual('What is this?')
  });

  it('should have its component name as default className', () => {
    expect(component.find("div").hasClass("about-component")).toEqual(true)
  });

});
