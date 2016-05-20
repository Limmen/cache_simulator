/**
 * Test for the tableelement-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/TableElement');

import React from 'react';
import { render } from 'enzyme';
import TableElement from '../../src/client/components/TableElement';

describe('TableElement', () => {
  let component;

  beforeEach(() => {
    component = render(<TableElement />);
  });

  it('should have its component name as default className', () => {
    expect(component.find("td").hasClass("tableelement-component")).toEqual(true)
  });

  it('should render one table element', () => {
    expect(component.find("td").length).toEqual(1);
  });
});
