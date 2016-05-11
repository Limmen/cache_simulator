/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */

import expect from 'expect'
import React from 'react'
import createComponent from 'helpers/shallowRenderHelper';
import Counter from 'components//Counter.js'

describe('Counter', () => {
  let component;
  let props = {
    onIncrement: expect.createSpy(),
    value : 0
  }

  beforeEach(() => {
    component = createComponent(Counter, props);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).toBe('cacheform-component');
  });

  it('should display count', () => {
    //let { p } = component.props.children
    //expect(p.text()).toMatch("0")
  })

  it('button should call onIncrement', () => {
    //let { button } = component.props.children
    //button.simulate('click')
    //expect(button.onIncrement).toHaveBeenCalled()
  })

});
