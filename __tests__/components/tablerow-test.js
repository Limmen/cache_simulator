/**
 * Test for the tablerow-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import TableRow from '../../src/client/components/CacheTableRow';
import initialContent from '../../src/client/reducers/initialCacheContent';

describe('TableRow', () => {
  let component;
  let data = initialContent(64, 8, 2).sets[0].rows[0]

  beforeEach(() => {
    component = mount(<table><tbody><TableRow data={data} /></tbody></table>)
  });

  it('should render one tablerow', () => {
    expect(component.find(".tablerow-component").length).toEqual(1);
  });


  it('should have props', () => {
    expect(component.find("TableRow").props().data).toEqual(initialContent(64, 8, 2).sets[0].rows[0]);
  });

  it('should render tablelements', () => {
    expect(component.find("TableElement").length).toEqual(8);
  });

});

