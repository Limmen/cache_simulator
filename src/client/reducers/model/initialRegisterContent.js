/**
 * Exports a function that returns a inital register layout
 *
 * Created by kim on 2016-06-16.
 */

import {Map, List} from 'immutable'

/**
 * Function that creates an initial empty register layout.
 *
 * @returns {*} Register layout
 */
export default function initialRegisterContent() {

  let register = Map(
    {
      registers: List()
    });

  for (let i = 0; i < 32; i++) {
    let data = "0x00"
    let newRegisters = register.set("registers", register.get("registers").push(Map(
      {
        data: data,
        number: i,
        id: "register_" + i
      })))
    register = newRegisters;
  }
  return register;
}

