/**
 * Test for the table-component
 *
 * Created by kim on 2016-05-11.
 */

jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import Table from '../../src/client/components/Table';

describe('Table', () => {
  let component;
  let data = initialContent(64, 8, 2)

  beforeEach(() => {
    component = mount(<Table data={data.content[0]}/>)
  });

  it('should render one table', () => {
    expect(component.find(".table-component").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.props().data).toEqual(initialContent(64, 8, 2).content[0]);
  });

  it('should render tablerows', () => {
    expect(component.find("TableRow").length).toEqual(4);
  });


});

function initialContent(cacheSize, blockSize, associativity) {

  let state =
  {
    content: []
  }

  for (let i = 0; i < associativity; i++) {
    let table = {rows: []}
    state.content.push(table)
    for (let j = 0; j < (cacheSize/associativity) / blockSize; j++) {
      let row = {elements: []}
      table.rows.push(row)
      for (let k = 0; k < blockSize; k++) {
        let element =
        {
          id: "id" + i + j + k,
          set: i,
          index: j,
          byte: k,
          data: 'empty',
          address: 'empty',
          validbit: 'N'
        }
        row.elements.push(element)
      }
    }
  }
  return state;
}
