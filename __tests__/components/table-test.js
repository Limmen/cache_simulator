/**
 * Test for the table-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import Table from '../../src/client/components/Table';

describe('Table', () => {
  let component;
  let rows = 4;
  let blocksize = 4;

  beforeEach(() => {
    component = mount(<Table rows={rows} blocksize={blocksize}/>)
  });

  it('should have its component name as default className', () => {
    expect(component.find("div").hasClass("table-component")).toEqual(true);
  });

  it('should render one table', () => {
    expect(component.find("table").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.props().rows).toEqual(4);
    expect(component.props().blocksize).toEqual(4);
  });

  it('should render tablerows', () => {
    expect(component.find("TableRow").length).toEqual(4);
  });

});
