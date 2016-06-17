/**
 * Test for the registertablerow-component
 *
 * Created by kim on 2016-06-17.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import RegisterTableRow from '../../src/client/components/RegisterTableRow';
import initialRegisterContent from '../../src/client/reducers/helper_functions/initialRegisterContent';

describe('RegisterTableRow', () => {
  let component;
  let data = initialRegisterContent()

  beforeEach(() => {
    component = mount(<table><tbody><RegisterTableRow data={data.get("registers").get(0)} /></tbody></table>)
  });

  it('should render one registertablerow', () => {
    expect(component.find(".registertablerow-component").length).toEqual(1);
  });


  it('should have props', () => {
    expect(component.find("RegisterTableRow").props().data).toEqual(initialRegisterContent().get("registers").get(0));
  });

  it('should render tablelements', () => {
    expect(component.find("td").length).toEqual(2);
  });

});

