/**
 * Test for the table-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import CacheTable from '../../src/client/components/CacheTable';
import initialCacheContent from '../../src/client/reducers/initialCacheContent';

describe('Table', () => {
  let component;
  let data = initialCacheContent(64, 8, 2)

  beforeEach(() => {
    component = mount(<CacheTable data={data.sets[0]}/>)
  });

  it('should render one table', () => {
    expect(component.find(".cachetable-component").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.props().data).toEqual(initialCacheContent(64, 8, 2).sets[0]);
  });

  it('should render tablerows', () => {
    expect(component.find("CacheTableRow").length).toEqual(4);
  });


});

