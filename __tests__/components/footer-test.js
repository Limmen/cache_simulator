/**
 * Test for the footer-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/Footer');

import React from 'react';
import { render } from 'enzyme';
import Footer from '../../src/client/components/Footer';

describe('Footer', () => {
  let component;

  beforeEach(() => {
    component = render(<Footer />);
  });

  it('should render one footer', () => {
    expect(component.find("footer").length).toEqual(1);
  });
  
  it('should have its component name as default className', () => {
    expect(component.find("div").hasClass("footer-component")).toEqual(true)
  });
});
