/**
 * Test for the header-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/Header');

import React from 'react';
import { render } from 'enzyme';
//import { expect } from 'chai';
import Header from '../../src/client/components/Header';

describe('Header', () => {
  let component;

  beforeEach(() => {
    component = render(<Header />);
  });

  it('should render a title', () => {
    expect(component.find("h1").text()).toEqual('Cache-Simulator')
  });

  it('should have its component name as default className', () => {
    expect(component.find("div").hasClass("header-component")).toEqual(true)
  });

  it('should render a jumbotron', () => {
    expect(component.find("div").hasClass("jumbotron")).toEqual(true)
  });
});
