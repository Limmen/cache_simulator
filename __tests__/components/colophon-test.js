/**
 * Test for the colophon-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/Colophon');

import React from 'react';
import { render } from 'enzyme';
import Colophon from '../../src/client/components/Colophon';

describe('Colophon', () => {
  let component;

  beforeEach(() => {
    component = render(<Colophon />)
  });

  it('should render colophon title', () => {
    expect(component.find("h3").text()).toEqual('Colophon')
  });

  it('should have its component name as default className', () => {
    expect(component.find("div").hasClass("colophon-component")).toEqual(true)
  });

});
