import {Map, List} from 'immutable'

export default function initialRegisterContent() {

  let register = Map(
    {
      registers: List()
    });

  for (let i = 0; i < 32; i++) {
    let data = "empty"
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

