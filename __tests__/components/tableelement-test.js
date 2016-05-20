/**
 * Test for the tableelement-component
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/components/TableElement');

import React from 'react';
import { mount } from 'enzyme';
import TableElement from '../../src/client/components/TableElement';

describe('TableElement', () => {
  let component;
  let data = initialContent(64, 8, 2)

  beforeEach(() => {
    component = mount(<table><tbody><tr><TableElement data={data.content[0].rows[0].elements[0]} /></tr></tbody></table>);
  });


  it('should render one table element', () => {
    expect(component.find("TableElement").length).toEqual(1);
  });

  it('should have props', () => {
    expect(component.find("TableElement").props().data).toEqual(initialContent(64, 8, 2).content[0].rows[0].elements[0]);
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
