/**
 * Test for the tableelement-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import CacheTableElement from '../../src/client/components/CacheTableElement';
import initialCacheContent from '../../src/client/reducers/helper_functions/initialCacheContent';

describe('CacheTableElement', () => {
  let component;
  let data = initialCacheContent(64, 8, 2, 'LRU').get("sets").get(0).get("rows").get(0).get("elements").get(0)


  beforeEach(() => {
    component = mount(<table><tbody><tr><CacheTableElement data={data} /></tr></tbody></table>);
  });

  it('should render one table element', () => {
    expect(component.find("CacheTableElement").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.find("CacheTableElement").props().data).toEqual(initialCacheContent(64, 8, 2, 'LRU').get("sets").get(0).get("rows").get(0).get("elements").get(0));
  });

});

