import {BytecodeInstruction} from "./util.ts"
import HTML from "html-parse-stringify"

/**
 * AsmToByte
 * Takes in an ASM (intel) x86 instruction (e.g. MOV EAX, 42) and outputs the correspoding bytecode
 * @param {string} input - ASM instruction, case insensitive
 * @returns {BytecodeInstruction} Equivalent bytecode instruction (x86)
 */
export default async function AsmToByte(input: string) : Promise<BytecodeInstruction> {
    // https://www.felixcloutier.com/x86/
    let fetched = await (await fetch("https://www.felixcloutier.com/x86/aaa")).text()
    fetched = fetched.replace("\n", "")
    let parsed = HTML.parse(fetched)
    let body = parsed[0].children[0].children[1].children

    let tables: any = []

    body.forEach((table, i) => {
        if (table.name == "table") {
            tables.push({})
            // console.log(tag)
            /*{
  type: "tag",
  name: "tr",
  voidElement: false,
  attrs: {},
  children: [
    { type: "text", content: "\n" },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Opcode" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Instruction" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Op/En" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "64-bit Mode" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Compat/Leg Mode" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Description" } ]
    }
  ]
}
{
  type: "tag",
  name: "tr",
  voidElement: false,
  attrs: {},
  children: [
    { type: "text", content: "\n" },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "37" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "AAA" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "ZO" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Invalid" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Valid" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "ASCII adjust AL after addition." } ]
    }
  ]
}
{
  type: "tag",
  name: "tr",
  voidElement: false,
  attrs: {},
  children: [
    { type: "text", content: "\n" },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Op/En" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Operand 1" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Operand 2" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Operand 3" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "th",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "Operand 4" } ]
    }
  ]
}
{
  type: "tag",
  name: "tr",
  voidElement: false,
  attrs: {},
  children: [
    { type: "text", content: "\n" },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "ZO" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "N/A" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "N/A" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "N/A" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "N/A" } ]
    }
  ]
}
{
  type: "tag",
  name: "tr",
  voidElement: false,
  attrs: {},
  children: [
    { type: "text", content: "\n" },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "#UD" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "If the LOCK prefix is used." } ]
    }
  ]
}
{
  type: "tag",
  name: "tr",
  voidElement: false,
  attrs: {},
  children: [
    { type: "text", content: "\n" },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "#UD" } ]
    },
    { type: "text", content: " " },
    {
      type: "tag",
      name: "td",
      voidElement: false,
      attrs: {},
      children: [ { type: "text", content: "If in 64-bit mode." } ]
    }
  ]
}*/
            table.children.forEach(row => {
                if (row.name == "tr") {
                    console.log(row)
                }
            })
        }
    })

    return {opcode:0,args:[]}
}

// TESTING DELETE
AsmToByte("MOV EAX, 2")