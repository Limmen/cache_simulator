/**
 * Test for the tableelement-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import TableElement from '../../src/client/components/TableElement';
import initialContent from '../../src/client/reducers/initialContent';

describe('TableElement', () => {
  let component;
  let data = initialContent(64, 8, 2)


  beforeEach(() => {
    component = mount(<table><tbody><tr><TableElement data={data.sets[0].rows[0].elements[0]} /></tr></tbody></table>);
  });

  it('should render one table element', () => {
    expect(component.find("TableElement").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.find("TableElement").props().data).toEqual(initialContent(64, 8, 2).sets[0].rows[0].elements[0]);
  });

});

