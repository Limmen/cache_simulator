/**
 * Test for the table-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import Table from '../../src/client/components/Table';
import initialContent from '../../src/client/reducers/initialContent';

describe('Table', () => {
  let component;
  let data = initialContent(64, 8, 2)

  beforeEach(() => {
    component = mount(<Table data={data.sets[0]}/>)
  });

  it('should render one table', () => {
    expect(component.find(".table-component").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.props().data).toEqual(initialContent(64, 8, 2).sets[0]);
  });

  it('should render tablerows', () => {
    expect(component.find("TableRow").length).toEqual(4);
  });


});

