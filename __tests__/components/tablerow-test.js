/**
 * Test for the tablerow-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import CacheTableRow from '../../src/client/components/CacheTableRow';
import initialCacheContent from '../../src/client/reducers/helper_functions/initialCacheContent';

describe('CacheTableRow', () => {
  let component;
  let data = initialCacheContent(64, 8, 2, 'LRU').get("sets").get(0).get("rows").get(0)

  beforeEach(() => {
    component = mount(<table><tbody><CacheTableRow data={data} /></tbody></table>)
  });

  it('should render one tablerow', () => {
    expect(component.find(".cachetablerow-component").length).toEqual(1);
  });


  it('should have props', () => {
    expect(component.find("CacheTableRow").props().data).toEqual(initialCacheContent(64, 8, 2, 'LRU').get("sets").get(0).get("rows").get(0));
  });

  it('should render tablelements', () => {
    expect(component.find("CacheTableElement").length).toEqual(8);
  });

});

