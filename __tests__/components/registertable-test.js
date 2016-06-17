/**
 * Test for the registertable-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import RegisterTable from '../../src/client/components/RegisterTable';
import initialRegisterContent from '../../src/client/reducers/helper_functions/initialRegisterContent';

describe('RegisterTable', () => {
  let component;
  let data = initialRegisterContent()

  beforeEach(() => {
    component = mount(<RegisterTable data={data}/>)
  });

  it('should render one registertable', () => {
    expect(component.find(".registertable-component").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.props().data).toEqual(initialRegisterContent());
  });

  it('should render tablerows', () => {
    expect(component.find("RegisterTableRow").length).toEqual(32);
  });


});

