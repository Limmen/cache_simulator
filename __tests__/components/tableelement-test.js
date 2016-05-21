/**
 * Test for the tableelement-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import CacheTableElement from '../../src/client/components/CacheTableElement';
import initialCacheContent from '../../src/client/reducers/initialCacheContent';

describe('CacheTableElement', () => {
  let component;
  let data = initialCacheContent(64, 8, 2)


  beforeEach(() => {
    component = mount(<table><tbody><tr><CacheTableElement data={data.sets[0].rows[0].elements[0]} /></tr></tbody></table>);
  });

  it('should render one table element', () => {
    expect(component.find("CacheTableElement").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.find("CacheTableElement").props().data).toEqual(initialCacheContent(64, 8, 2).sets[0].rows[0].elements[0]);
  });

});

