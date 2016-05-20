/**
 * Test for the tablerow-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import TableRow from '../../src/client/components/TableRow';

describe('TableRow', () => {
  let component;
  let data={}

  beforeEach(() => {
    component = mount(<table><tbody><TableRow data={} /></tbody></table>)
  });

  it('should render one tablerow', () => {
    expect(component.find("tr").length).toEqual(1);
  });

  it('should have its component name as default className', () => {
    expect(component.find("tr").hasClass("tablerow-component")).toEqual(true);
  });
/*
  it('should have props', () => {
    expect(component.find("TableRow").props().blocksize).toEqual(4);
  });
  */
/*
  it('should render tablelements', () => {
    expect(component.find("td").length).toEqual(4);
  });
  */

});
