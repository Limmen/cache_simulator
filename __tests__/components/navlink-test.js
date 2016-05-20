/**
 * Test for the navlink-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { shallow } from 'enzyme';
import NavLink from '../../src/client/components/NavLink';

describe('NavLink', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NavLink />)
  });

  it('should render one link', () => {
    expect(component.find("Link").length).toEqual(1);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass("navlink-component")).toEqual(true);
  });

});
